'''
Created on Sep 1, 2020

@author: matth
'''

import random
import PhraseFinder

while True:
    for x in range(random.randint(10,100)):
        print(random.choice("01"),end=random.choice("01"))
    
    for x in PhraseFinder.CAPTION:
        print(x, end='')
    
    for x in range(random.randint(100,500)):
        print(random.choice("01"),end=random.choice("01"))
        