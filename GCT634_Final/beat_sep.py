#-*- coding: utf-8 -*-
from __future__ import division

import librosa
import madmom
import numpy as np
import scipy
import argparse
#import sound_utils
import time
import os
import matplotlib.pyplot as plt


# TODO: DOCS / unify time units







def pattern_cut(file_path,times):
    p = []
    times=times
    y, sr = librosa.load(file_path, sr=44100)
    time_to_sample = librosa.time_to_samples(times, sr=44100)
    # 8 patterns
    p.append(y[time_to_sample[0]:time_to_sample[1]])
    p.append(y[time_to_sample[2]:time_to_sample[3]])
    p.append(y[time_to_sample[4]:time_to_sample[5]])
    p.append(y[time_to_sample[6]:time_to_sample[7]])
    p.append(y[time_to_sample[8]:time_to_sample[9]])
    p.append(y[time_to_sample[10]:time_to_sample[11]])
    p.append(y[time_to_sample[12]:time_to_sample[13]])
    p.append(y[time_to_sample[14]:time_to_sample[15]])

    for t in range(0, 8):
        name = 'p' + str(t)

        onset_samples = librosa.onset.onset_detect(y=p[t], sr=sr, units='samples')
        onset = onset_samples[0] -1000
        out = p[t][onset:]

        librosa.output.write_wav(name + '.wav', out, sr)

    return

def beat_comb_peakpick(file_path):
    """
    Comb filter based beat-tracking method.
    because basic function may gives duplicate(too close) or disordered beats, we added uniqueness / 0.2 sec threshold.

    :param file_path: path of audio file
    :return: list of beat locations, in sec unit.

    REFERENCE
    http://madmom.readthedocs.io/en/latest/modules/features/beats.html#madmom.features.beats.BeatTrackingProcessor
    """
    beat_est = madmom.features.onsets.RNNOnsetProcessor()(file_path)
    beat_track_processor = madmom.features.beats.BeatTrackingProcessor(fps=100)

    loc_beats = beat_track_processor(beat_est)
    plt.plot(loc_beats)
    #plt.show()

    loc_beats = np.unique(loc_beats)
    m = 1
    loc_beats_new = np.zeros(loc_beats.shape)
    last_beat = loc_beats[0]
    loc_beats_new[0] = loc_beats[0]
    for n in range(1, len(loc_beats)):
        if loc_beats[n] - last_beat >= 0.2:
            last_beat = loc_beats[n]
            loc_beats_new[m] = last_beat
            m += 1
    loc_beats = loc_beats_new[:m]



    return loc_beats #beat

def sample_cut(file_path,adj_S,kcount,hcount,scount):
    b_to_s = []
    adj_S=adj_S
    adj_E=adj_S
    kcount=kcount
    hcount=hcount
    scount = scount


    times = [11.5 + adj_S, 18.5 + adj_E
        , 25.3 + adj_S, 32.2 + adj_E
        , 39.3 + adj_S, 46.2 + adj_E
        , 53 + adj_S, 60 + adj_E
        , 66.5 + adj_S, 73.7 + adj_E
        , 80.5 + adj_S, 87.5 + adj_E
        , 94.2 + adj_S, 101.2 + adj_E
        , 108 + adj_S, 115 + adj_E]  # sec


    pattern_cut(file_path,times)

    for p in range(0, 8):


        b_name = 'p' + str(p) + '.wav'
        y, sr = librosa.core.load(b_name, sr=44100)
        b_to_s=(librosa.time_to_samples(beat_comb_peakpick(b_name), sr=44100))

        print (str(p)+'  /  '+str(len(b_to_s)))


        beat_n=0
        beat_number=0 #avoid duplication
        for b in b_to_s:

            if b>beat_sp:
                out = y[int(b-beat_sp):int(b + beat_length)] #cut

            else:
                out = y[int(b):int(b + beat_length)]  # cut




            #################in order
            #librosa.output.write_wav('./output/'+str(p)+'/'+str(beat_number)+'_'+str(label[p,beat_n])+'.wav', out, sr)




            if label[p,beat_n] == 0:

                librosa.output.write_wav('./output/kick/'+str(kcount)+'.wav', out, sr)
                kcount = kcount + 1

            elif label[p,beat_n] == 1:

                librosa.output.write_wav('./output/hi/'+ str(hcount)+'.wav', out, sr)
                hcount = hcount + 1

            elif label[p, beat_n] == 2:

                librosa.output.write_wav('./output/snare/' + str(scount)+'.wav', out, sr)
                scount = scount + 1




            #label_beat_number_pattern
            #print(label[p,beat_n])

            beat_n=beat_n+1
            beat_number=beat_number+1
             ##avoid duplication

            if beat_number == 16:
                break

    return kcount,hcount,scount

# adj_S=0
#
# adj_E=adj_S






label=np.array([[0,1,2,1,0,1,2,1,0,1,2,1,0,1,2,1]
    ,[0,1,2,1,0,1,2,1,0,1,2,1,0,1,2,1]
    ,[0,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2]
    ,[0,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2]
    ,[0,1,1,1,2,1,1,1,0,1,1,1,2,1,1,1]
    ,[0,1,1,1,2,1,1,1,0,1,1,1,2,1,1,1]
    ,[0,2,1,2,0,2,1,2,0,2,1,2,0,2,1,2]
    ,[0,2,1,2,0,2,1,2,0,2,1,2,0,2,1,2]])

beat_sp=0.1*44100
beat_length=0.3*44100#sec

#name,sec,counts

out=sample_cut('./Samples/sangeun.wav',0,0,0,0)
out=sample_cut('./Samples/choi3.wav',0.4,out[0],out[1],out[2])
out=sample_cut('./Samples/joong.wav',0.5,out[0],out[1],out[2])
out=sample_cut('./Samples/choi2.wav',0.2,out[0],out[1],out[2])
out=sample_cut('./Samples/wonil.wav',0.1,out[0],out[1],out[2])
out=sample_cut('./Samples/choi4.wav',0,out[0],out[1],out[2])
out=sample_cut('./Samples/jung.wav',0.1,out[0],out[1],out[2])
out=sample_cut('./Samples/choi5.wav',-0.6,out[0],out[1],out[2])
out=sample_cut('./Samples/wonjun.wav',2.8,out[0],out[1],out[2])
out=sample_cut('./Samples/dongju.wav',0.2,out[0],out[1],out[2])
out=sample_cut('./Samples/choi6.wav',0.3,out[0],out[1],out[2])
out=sample_cut('./Samples/kiki.wav',0.5,out[0],out[1],out[2])
out=sample_cut('./Samples/sanggue.wav',0.4,out[0],out[1],out[2])
out=sample_cut('./Samples/noname.wav',-0.15,out[0],out[1],out[2])
out=sample_cut('./Samples/choi1.wav',0.4,out[0],out[1],out[2])






print (out)



#sangeun = 0 , 0
#joong = 0.5 ,0.5
#wonil = 0.1,0,1
#jung = 0.1,0.1
#wonjun=2.8,2.8
#dongju = 0.2
#kiki = 0.5
#sanggue= 0.4
#noname =  -0.15
#choi1 = 0.4 #check
#choi2=0.2
#choi3= 0.4
#choi4=0
#choi5=-0.6
#choi6=0.3 #check




# times = [11.5 + adj_S, 18.5 + adj_E
#         , 25.3 + adj_S, 32.2 + adj_E
#         , 39.3 + adj_S, 46.2 + adj_E
#         , 53 + adj_S, 60 + adj_E
#         , 66.5 + adj_S, 73.7 + adj_E
#         , 80.5 + adj_S, 87.5 + adj_E
#         , 94.2 + adj_S, 101.2 + adj_E
#         , 108 + adj_S, 115 + adj_E]  # sec




