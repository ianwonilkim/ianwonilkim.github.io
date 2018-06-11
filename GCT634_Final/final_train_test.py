#-*- coding: utf-8 -*-


import sys
import os
import numpy as np
import librosa
from final_feature_summary import *

from sklearn.linear_model import SGDClassifier

def train_model(train_X, train_Y, valid_X, valid_Y, hyper_param1):

    # Choose a classifier (here, linear SVM)
    clf = SGDClassifier(verbose=0, loss="epsilon_insensitive", alpha=hyper_param1, max_iter=1000, penalty="l2", random_state=0)

    # train
    clf.fit(train_X, train_Y)

    # validation
    valid_Y_hat = clf.predict(valid_X)

    accuracy = np.sum((valid_Y_hat == valid_Y))/test_num_audio*100.0
    print ('validation accuracy = ' + str(accuracy) + ' %')

    return clf, accuracy

import os
import numpy as np
import librosa
import librosa.display
import numpy, scipy, matplotlib.pyplot as plt, IPython.display as ipd
import pickle





if __name__ == '__main__':

    howmany_text = open(data_path + 'howmany.txt', 'r')

    howmany = []
    for h in howmany_text:
        howmany.append(h[:-1])

    MFCC_DIM = 10
    train_num_audio = int(float(howmany[0]) + float(howmany[3]) + float(howmany[6]))
    valid_num_audio = int(float(howmany[1]) + float(howmany[4]) + float(howmany[7]))
    test_num_audio = int(float(howmany[2]) + float(howmany[5]) + float(howmany[8]))








    # load data
    train_X = mean_Features('train')
    valid_X = mean_Features('valid')
    test_X = mean_Features('test')


    # label generation

    train_Y = np.zeros(shape=(train_X.shape[1]))
    valid_Y = np.zeros(shape=(valid_X.shape[1]))
    test_Y = np.zeros(shape=(test_X.shape[1]))

    train_kick = int(howmany[0])
    train_sn = int(howmany[3])
    train_hi = int(howmany[6])

    valid_kick=int(howmany[1])
    valid_sn=int(howmany[4])
    valid_hi=int(howmany[7])

    test_kick = int(howmany[2])
    test_sn = int(howmany[5])
    test_hi = int(howmany[8])


    #kick=1 sn=2 hi=3
    train_Y[0:train_kick]= 1
    train_Y[train_kick:train_kick+train_sn] = 2
    train_Y[train_kick+train_sn:] = 3

    valid_Y[0:valid_kick] = 1
    valid_Y[valid_kick:valid_kick + valid_sn] = 2
    valid_Y[valid_kick + valid_sn:] = 3

    test_Y[0:test_kick] = 1
    test_Y[test_kick:test_kick + test_sn] = 2
    test_Y[test_kick + test_sn:] = 3



    #####################
    from sklearn.preprocessing import StandardScaler


    print (train_X.shape)
    print (test_X.shape)
    train_X = train_X.T
    test_X = test_X.T


    scaler = StandardScaler()
    scaler.fit(train_X)
    print(scaler.mean_)

    train_X = scaler.transform(train_X)
    test_X = scaler.transform(test_X)

    from sklearn.neural_network import MLPClassifier

    mlp = MLPClassifier(hidden_layer_sizes=(10, 20, 10, 30))
    mlp.fit(train_X, train_Y)

    from sklearn.metrics import classification_report, confusion_matrix

    predictions = mlp.predict(test_X)

    print(confusion_matrix(test_Y, predictions))
    print(classification_report(test_Y, predictions))


    test_MLP = [[20,10],[30,20,20,30,30],[10, 20, 10, 30],[1000,1000,1000],[30,30,30],[30, 30, 30, 30, 30, 30]]




    for MLPT in test_MLP:
        mlp = MLPClassifier(hidden_layer_sizes=(MLPT))
        mlp.fit(train_X, train_Y)

        predictions = mlp.predict(test_X)

        print(confusion_matrix(test_Y, predictions))
        print(classification_report(test_Y, predictions))
        print (MLPT)
        pp=classification_report(test_Y, predictions)

    filename = 'finalized_model.sav'
    pickle.dump(mlp, open(filename, 'wb'))

    # loaded_model = pickle.load(open('./finalized_model.sav', 'rb'))
    # result = loaded_model.score(test_X, test_Y)
    # print(result)




#############################








    ##########SGD

    ###############feature normalizaiton original




    # train_X = train_X.T
    # train_X_mean = np.mean(train_X, axis=0)
    # train_X = train_X - train_X_mean
    # train_X_std = np.std(train_X, axis=0)
    # train_X = train_X / (train_X_std + 1e-5)
    #
    # valid_X = valid_X.T
    # valid_X = valid_X - train_X_mean
    # valid_X = valid_X/(train_X_std + 1e-5)
    #
    # # training model
    # alphas = [0.0001, 0.001, 0.01, 0.1, 1, 10]
    #
    # model = []
    # valid_acc = []
    # for a in alphas:
    #     clf, acc = train_model(train_X, train_Y, valid_X, valid_Y, a)
    #     model.append(clf)
    #     valid_acc.append(acc)
    #
    # # choose the model that achieve the best validation accuracy
    # final_model = model[np.argmax(valid_acc)]
    #
    # # now, evaluate the model with the test set
    # test_X = test_X.T
    # test_X = test_X - train_X_mean
    # test_X = test_X/(train_X_std + 1e-5)
    # test_Y_hat = final_model.predict(test_X)
    #
    # accuracy = np.sum((test_Y_hat == test_Y))/test_num_audio*100.0
    # print ('test accuracy = ' + str(accuracy) + ' %')
    #
    # filename = 'finalized_model.sav'
    # pickle.dump(final_model, open(filename, 'wb'))
    #
    #



##################


