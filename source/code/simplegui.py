from pyforge.gui import register_gui, toggle_gui
from pyforge.gui.frame import Frame
from pyforge.utils import *
from pyglet.window import key


class SimpleGUI():

    def __init__(self, game):
        self.game = game
        self.frame = Frame(self.game, True)


def on_key_press(symbol, modifiers):
    if symbol == key.G:
        toggle_gui('simplegui')

def main():
    register_gui('simplegui', SimpleGUI(get_minecraft()))
    get_minecraft().register_event('key_press', on_key_press)
