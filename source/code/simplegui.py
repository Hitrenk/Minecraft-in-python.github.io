from pyforge import add_mod
from pyforge.gui import register_gui, toggle_gui
from pyforge.gui.widget.button import Button
from pyforge.gui.frame import Frame
from pyforge.utils import *


class ExampleGUI():

    def __init__(self, game):
        self.game = game
        self.frame = Frame(self.game, True)
        w, h = get_size()
        self.button = Button((w - 200) / 2, h / 2, 200, 40,
                'This is a button')
        self.frame.add_widget(self.button)


class SimpleGUI():

    def __init__(self):
        pass

    def on_load(self):
        register_gui('simplegui', ExampleGUI(get_minecraft()))

        def on_key_press(symbol, modifiers):
            if symbol == get_key('G'):
                toggle_gui('simplegui')

        get_minecraft().register_event('key_press', on_key_press)


add_mod('simplegui', SimpleGUI)
