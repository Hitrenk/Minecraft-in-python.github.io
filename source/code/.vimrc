set fileencodings=utf-8
set encoding=utf-8
set smarttab
set shiftwidth=4
set softtabstop=8
set mouse=a
set autoindent
set smartindent
set number
set ruler
set cursorline

syntax enable
syntax on

filetype plugin indent on
filetype on

let html_use_css=1
let javascript_enable_domhtmlcss=1

inoremap ( ()<ESC>i
inoremap [ []<ESC>i
inoremap ) <c-r>=ClosePair(')')<CR>
inoremap ] <c-r>=ClosePair(']')<CR>

func! ClosePair(char)
    if getline('.')[col('.') - 1] == a:char
	return "\<Right>"
    else
	return a:char
    endif
endf

augroup resCur
    autocmd!
    autocmd BufReadPost * call setpos(".", getpos("'\""))
augroup END
