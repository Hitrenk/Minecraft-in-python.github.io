import math, os, sys, random, time

maps = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 2, 0, 1, 0, 0, 3, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ]

def clear():
    if sys.platform == 'win32':
        os.system('cls')
    else:
        os.system('clear')

def astar(start, end, show_step=True):
    step = 0
    end_nav = False
    history = []
    node = []
    while True:
        step += 1
        t = []
        for i in get_near(*start):
            if i not in history:
                t.append(i)
        l = {}
        for i in t:
            l.setdefault(i, math.dist(i, end))
        r = min(list(l.values()))
        for k, v in l.items():
            if v == r:
                start = k
                if show_step:
                    sign(*k)
                history.append(k)
                node.append(k)
                break
        if show_step:
            draw()
        if end_nav:
            print('step:', step)
            return node
        if end in t:
            end_nav = True

def get(x, y):
    return maps[y][x]

def get_near(x, y):
    l = []
    for p in [(1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (1, -1), (-1, 1), (-1, -1)]:
        if get(x + p[0], y + p[1]) != 1:
            l.append((x + p[0], y + p[1]))
    else:
        return l

def sign(x, y):
    global maps
    if maps[y][x] == 0:
        maps[y][x] = 4
    else:
        maps[y][x] = maps[y][x] + 1

def draw():
    clear()
    for y in range(len(maps)):
        for x in range(len(maps[0])):
            print(maps[y][x], end=' ')
        print('\n', end='')
    time.sleep(0.5)

if __name__ == '__main__':
    n1 = astar((1, 4), (6, 4), False)
    n2 = astar((6, 4), (1, 4), False)
    if len(n1) <= len(n2):
        astar((1, 4), (6, 4))
    else:
        astar((6, 4), (1, 4))
