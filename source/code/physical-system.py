import math
from PIL import Image, ImageDraw, ImageFont

width, height = 400, 300
img = Image.new('RGBA', (width, height), 'white')
img_draw = ImageDraw.Draw(img)
font = ImageFont.truetype('FreeMono.ttf', 15)
font_big = ImageFont.truetype('FreeMono.ttf', 20)
font_small = ImageFont.truetype('FreeMono.ttf', 12)

# 坐标轴
img_draw.line([(10, 50), (10, height - 10)], fill='black', width=3)
img_draw.line([(10, height - 10), (width - 10, height - 10)], fill='black', width=3)

# 函数
func = lambda x: -0.002 * x ** 2 + x
x, y = 0, 0
last = (10, height - 10)
l = []
while 0 <= x <= width - 20:
    y = int(func(x))
    img_draw.line([last, (x + 10, height - 10 - y)], fill='blue', width=2)
    last = (x + 10, height - 10 - y)
    x += 1
img_draw.text((last[0] - 10, last[1] + 10), 'y = -1/500x² + x', anchor='rt', font=font, fill='blue')

# 三角形
y = height - 10 - int(func(40))
p1 = (40 + 10, y)
p2 = (80 + 10, y)
y = height - 10 - int(func(80))
p3 = (80 + 10, y)
img_draw.line([p1, p2], fill='red')
img_draw.line([p1, p3], fill='red')
img_draw.line([p2, p3], fill='red')
img_draw.text((p1[0] + 10, p1[1] - 2), 'α', anchor='ls', font=font_small, fill='black')

# 文字
y1 = height - 10 - int(func(40))
y2 = height - 10 - int(func(80))
img_draw.text((width // 2, 10), 'The basic physical system', anchor='mm', font=font_big, fill='black')
d12 = 40
img_draw.text((60 + 10, y1 + 10), '40', anchor='mm', font=font, fill='black')
d23 = func(80) - func(40)
img_draw.text((80 + 15, height - 10 - (func(80) - func(40) // 2)), '%s' % round(d23, 2), anchor='lm', font=font, fill='black')
d13 = math.sqrt((p3[0] - p1[0]) ** 2 + (p3[1] - p1[1]) ** 2)
img_draw.text((10 + (p3[0] - p1[0]) // 2, p3[1]), '%s' % round(d13, 2), anchor='lt', font=font, fill='black')
img_draw.text((width // 2, 30), 'Generate by PIL', anchor='mm', font=font_small, fill='black')
img_draw.text((width // 2, height // 2 - 40), 'arcsin∠α = %s/%s = %sº' % (round(d23, 2), round(d13, 2),
    round(math.degrees(math.asin(d23 / d13)), 2)), anchor='mm', font=font, fill='blue')

img.save('physical-system.png')
