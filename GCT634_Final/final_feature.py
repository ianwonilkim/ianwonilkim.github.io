#-*- coding: utf-8 -*-
import sys
import os
import numpy as np
import librosa
import librosa.display


def saving_tr(f_path, name, feature):
    file_name = name.replace('.wav', '.npy')
    save_file = './dataset/beat/Feature/' + 'train' + f_path + file_name

    if not os.path.exists(os.path.dirname(save_file)):
        os.makedirs(os.path.dirname(save_file))
    np.save(save_file, feature)

    return
def saving_val(f_path, name, feature):
    file_name = name.replace('.wav', '.npy')
    save_file = './dataset/beat/Feature/' + 'valid' + f_path + file_name

    if not os.path.exists(os.path.dirname(save_file)):
        os.makedirs(os.path.dirname(save_file))
    np.save(save_file, feature)

    return
def saving_te(f_path, name, feature):
    file_name = name.replace('.wav', '.npy')
    save_file = './dataset/beat/Feature/' + 'test' + f_path + file_name

    if not os.path.exists(os.path.dirname(save_file)):
        os.makedirs(os.path.dirname(save_file))
    np.save(save_file, feature)

    return
def train(tr_count):
    file_name = str(tr_count) + '.wav'

    saving_tr(mfcc_path, file_name, mfcc)
    saving_tr(dmfcc_path, file_name, dmfcc)
    saving_tr(ddmfcc_path, file_name, ddmfcc)
    saving_tr(mel_path, file_name, log_mel_S)
    saving_tr(zcrsum_path, file_name, zcrsum)
    saving_tr(sc_mat_path, file_name, sc_mat)
    saving_tr(full_path, file_name, full)

    return tr_count + 1
def valid(v_count):
    file_name = str(v_count) + '.wav'

    saving_val(mfcc_path, file_name, mfcc)
    saving_val(dmfcc_path, file_name, dmfcc)
    saving_val(ddmfcc_path, file_name, ddmfcc)
    saving_val(mel_path, file_name, log_mel_S)
    saving_val(zcrsum_path, file_name, zcrsum)
    saving_val(sc_mat_path, file_name, sc_mat)
    saving_val(full_path, file_name, full)

    return v_count + 1
def test(te_count):
    file_name = str(te_count) + '.wav'

    saving_te(mfcc_path, file_name, mfcc)
    saving_te(dmfcc_path, file_name, dmfcc)
    saving_te(ddmfcc_path, file_name, ddmfcc)
    saving_te(mel_path, file_name, log_mel_S)
    saving_te(zcrsum_path, file_name, zcrsum)
    saving_te(sc_mat_path, file_name, sc_mat)
    saving_te(full_path, file_name, full)

    return te_count + 1


data_path = './dataset/beat/'

mfcc_path = '/mfcc/'
dmfcc_path = '/dmfcc/'
ddmfcc_path = '/ddmfcc/'
mel_path = '/mel/'
zcrsum_path = '/zcrsum/'
sc_mat_path = '/sc_mat/'

mfeatures_path = '/mfeatures/'
full_path = '/full/'

MFCC_DIM = 30



label={'kick':538,'hi':716,'snare':657}
file_path='C:/Users/Window/Documents/beat/output/'


train_size=0.6
valid_size=0.2
test_size=0.2

k_size=[int(label['kick']*train_size),int(label['kick']*valid_size),int(label['kick']*test_size)]
h_size=[int(label['hi']*train_size),int(label['hi']*valid_size),int(label['hi']*test_size)]
s_size=[int(label['snare']*train_size),int(label['snare']*valid_size),int(label['snare']*test_size)]




khs_counting=[]

khs_counting.append(k_size)
khs_counting.append(h_size)
khs_counting.append(s_size)

f = open("./dataset/beat/howmany.txt",'w')

for n in khs_counting:
    for howm in n:
        f.write(str(howm)+'\n')



f.close()



train_num_audio = k_size[0]+h_size[0]+s_size[0]
valid_num_audio = k_size[1]+h_size[1]+s_size[1]
test_num_audio = k_size[2]+h_size[2]+s_size[2]



tr_count=0
v_count=0
te_count=0









for label_name,howmany in label.items():


    c=0
    #random_tvt=np.random.choice(range(howmany), howmany, replace=False)        #shuffle


    #for name in random_tvt:        #shuffle
    for name in range(0,howmany):

        c = c + 1
        if not (c % 10):
            print(label_name,c)



        audio_name=label_name+'/'+str(name)+'.wav'


        y, sr = librosa.load(file_path+audio_name, sr=44100)

        ##### Method 1 MFCC
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=MFCC_DIM)
        ###########DMFCC
        dmfcc = librosa.feature.delta(mfcc)
        ###########DDMFCC
        ddmfcc = librosa.feature.delta(mfcc, order=2)



        ##### Method 2 STFT
        S = librosa.core.stft(y, n_fft=1024, hop_length=512, win_length=1024)
        # power spectrum
        D = np.abs(S) ** 2
        # mel spectrogram (512 --> 40)
        mel_basis = librosa.filters.mel(sr, 1024, n_mels=40)
        mel_S = np.dot(mel_basis, D)
        # log compression
        log_mel_S = librosa.power_to_db(mel_S)

        ##### Method 3 zerocrossing
        # n0 = 0
        # n1 = 20000

        zero_crossings = librosa.zero_crossings(y, pad=False)

        zcrsum = sum(zero_crossings)
        zcrsum = np.repeat(zcrsum, mfcc.shape[1])
        zcrsum = np.reshape(zcrsum, (-1, 1))
        zcrsum = zcrsum.T



        ##### Method 4 spectral_centroids
        sc_mat = librosa.feature.spectral_centroid(y, sr=sr)
        # print .shape
        # sc 잘라주기 패턴이 보통 더 짧아서 문제
        #sc = sc[:8]
        # mean pooling
        # sc_mat = np.zeros(shape=(len(sc), mfcc.shape[1]))
        # for scmean in range(0, len(sc)):
        #     temp = np.repeat(sc[scmean], mfcc.shape[1])
        #     sc_mat[scmean] = temp








        ######concatenate
        full=np.concatenate((mfcc, dmfcc), axis=0)
        full = np.concatenate((full, ddmfcc), axis=0)
        full = np.concatenate((mfcc, log_mel_S), axis=0)
        full = np.concatenate((full, zcrsum), axis=0)
        full = np.concatenate((full, sc_mat), axis=0)
        #full = np.concatenate((full, times), axis=0)

        # only mine

        # mfeatures = np.concatenate((zcrsum, sc_mat), axis=0)













        # save features as a file


        if label_name == 'kick':

            #train
            if c <= k_size[0]:

                tr_count=train(tr_count)

            #valid
            elif c >= k_size[0] and c <= k_size[0]+k_size[1]:

                v_count=valid(v_count)

            #test
            elif c > k_size[0]+k_size[1]:

                te_count=test(te_count)



        if label_name == 'hi':
            if c <= h_size[0]:

                tr_count = train(tr_count)

            elif c >= h_size[0] and c <= h_size[0] + h_size[1]:

                v_count = valid(v_count)

            elif c > h_size[0] + h_size[1]:

                te_count = test(te_count)


        if label_name == 'snare':
            if c <= s_size[0]:

                tr_count = train(tr_count)

            elif c >= s_size[0] and c <= s_size[0] + s_size[1]:

                v_count = valid(v_count)

            elif c > s_size[0] + s_size[1]:

                te_count = test(te_count)







