import math, os, sys, random, time

maps = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 2, 0, 1, 0, 0, 3, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ]

def clear():
    if sys.platform == 'win32':
        os.system('cls')
    else:
        os.system('clear')

def astar(start, end):
    start_ = start
    history = [start]
    node = []
    first_node = None
    while True:
        t = []
        for i in get_near(*start):
            if i not in history:
                t.append(i)
        if end in t:
            return node
        l = {}
        for i in t:
            l.setdefault(i, math.dist(i, end))
        if len(l) == 0:
            if start == start_:
                return first_node + [None]
            if first_node is None:
                first_node = node
            start = start_
            node = []
            continue
        r = min(list(l.values()))
        for k, v in l.items():
            if v == r:
                start = k
                history.append(k)
                node.append(k)
                break

def get(x, y):
    return maps[y][x]

def get_near(x, y):
    l = []
    for p in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
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
    time.sleep(0.3)

if __name__ == '__main__':
    now1 = time.time()
    n1 = astar((1, 4), (6, 4))
    t1 = time.time() - now1
    now2 = time.time()
    n2 = astar((6, 4), (1, 4))
    t2 = time.time() - now2
    if (len(n1) <= len(n2)) or (n1[-1] is None):
        n = astar((1, 4), (6, 4))
        n = n[:-1]
        print(n)
    else:
        n = astar((6, 4), (1, 4))
        print(n)
    for i in n:
        sign(*i)
        draw()
    print('- ' * 8)
    print('Step:', len(n1) if len(n1) <= len(n2) else len(n2))
    print('Time:')
    print('  First  A*:', t1)
    print('  Second A*:', t2)
    print('  Total    :', t1 + t2)
