import sys
import os
import numpy as np
import matplotlib.pyplot as plt

data_path = './dataset/beat/'
F_path = './dataset/beat/Feature'
feature_name='/zcrsum/'


Feature_DIM = 1

howmany_text = open(data_path + 'howmany.txt', 'r')

howmany = []
for h in howmany_text:
    howmany.append(h[:-1])


train_num_audio = int(float(howmany[0])+float(howmany[3])+float(howmany[6]))
valid_num_audio = int(float(howmany[1])+float(howmany[4])+float(howmany[7]))
test_num_audio = int(float(howmany[2])+float(howmany[5])+float(howmany[8]))








def mean_Features(dataset='train'):




    if dataset == 'train':
        F_mat = np.zeros(shape=(Feature_DIM, train_num_audio))
    elif dataset == 'valid':
        F_mat = np.zeros(shape=(Feature_DIM, valid_num_audio))
    elif dataset == 'test':
        F_mat = np.zeros(shape=(Feature_DIM, test_num_audio))



    if dataset == 'train':
        for i in range(0,train_num_audio):

            F_file = F_path + '/train'+ feature_name +str(i) +'.npy'
            features = np.load(F_file)

            F_mat[:, i] = np.mean(features, axis=1)


    elif dataset == 'valid':

        for i in range(0, valid_num_audio):

            F_file = F_path + '/valid'+ feature_name  +str(i) +'.npy'
            features = np.load(F_file)

            F_mat[:, i] = np.mean(features, axis=1)


    elif dataset == 'test':

        for i in range(0, test_num_audio):

            F_file = F_path + '/test'+ feature_name  +str(i) +'.npy'
            features = np.load(F_file)

            F_mat[:, i] = np.mean(features, axis=1)


    return F_mat


if __name__ == '__main__':
    train_data = mean_Features('train')
    valid_data = mean_Features('valid')
    test_data = mean_Features('test')


    plt.figure(1)
    plt.subplot(3, 1, 1)
    plt.imshow(train_data, interpolation='nearest', origin='lower', aspect='auto')
    plt.colorbar(format='%+2.0f dB')

    plt.subplot(3, 1, 2)
    plt.imshow(valid_data, interpolation='nearest', origin='lower', aspect='auto')
    plt.colorbar(format='%+2.0f dB')

    plt.subplot(3, 1, 3)
    plt.imshow(test_data, interpolation='nearest', origin='lower', aspect='auto')
    plt.colorbar(format='%+2.0f dB')
    plt.show()




