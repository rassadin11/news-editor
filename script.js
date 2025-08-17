var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TITLES;
(function (TITLES) {
    TITLES[TITLES["H1"] = 1] = "H1";
    TITLES[TITLES["H2"] = 2] = "H2";
    TITLES[TITLES["H3"] = 4] = "H3";
    TITLES[TITLES["H4"] = 5] = "H4";
    TITLES[TITLES["H5"] = 6] = "H5";
    TITLES[TITLES["H6"] = 7] = "H6";
})(TITLES || (TITLES = {}));
var mainText = document.querySelector('.main-field__text');
function buttonActions(element, firstScreen, secondScreen) {
    element.addEventListener('click', function () {
        var homeScreen = document.querySelector("[data-screen=\"".concat(firstScreen, "\"]"));
        var screenHeaders = document.querySelector("[data-screen=\"".concat(secondScreen, "\"]"));
        homeScreen.classList.add('d-none');
        screenHeaders.classList.remove('d-none');
    });
}
// ! style buttons
// for headers
var buttonHeaders = document.querySelector('[data-action="headers"]');
var buttonHeadersBack = document.querySelector('[data-action="header-back"]');
// for lists
var buttonLists = document.querySelector('[data-action="lists"]');
var buttonListsBack = document.querySelector('[data-action="list-back"]');
buttonActions(buttonHeaders, 'home-screen', 'headers');
buttonActions(buttonHeadersBack, 'headers', 'home-screen');
buttonActions(buttonLists, 'home-screen', 'ul-screen');
buttonActions(buttonListsBack, 'ul-screen', 'home-screen');
function resetButtons() {
    document
        .querySelector("[data-screen=\"headers\"]")
        .classList.add('d-none');
    document
        .querySelector("[data-screen=\"ul-screen\"]")
        .classList.add('d-none');
    document
        .querySelector("[data-screen=\"home-screen\"]")
        .classList.remove('d-none');
}
// ! button actions
function generateTitle(button, title, titleSize) {
    button.onclick = function () {
        var sel = window.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        var range = sel.getRangeAt(0);
        if (range.collapsed)
            return;
        // Находим исходный родительский div
        var parentDiv = range.startContainer;
        parentDiv = parentDiv.parentNode;
        if (!parentDiv)
            return;
        // Получаем полный текст исходного div
        var fullText = parentDiv.textContent;
        var nodeName = parentDiv.nodeName;
        // Получаем текст до, внутри и после выделения
        var before = fullText.slice(0, range.startOffset);
        var selected = range.toString();
        var after = fullText.slice(range.startOffset + selected.length);
        // Создаём новые элементы
        var beforeDiv = before ? document.createElement(nodeName) : null;
        if (beforeDiv)
            beforeDiv.textContent = before;
        var wrapper = document.createElement(title);
        if (titleSize === 3) {
            wrapper.classList.add("heading-style-4");
        }
        else {
            wrapper.classList.add("heading-style-".concat(titleSize));
        }
        wrapper.classList.add('bold');
        wrapper.textContent = selected;
        var afterDiv = after ? document.createElement(nodeName) : null;
        if (afterDiv)
            afterDiv.textContent = after;
        // Вставляем перед старым div
        var container = parentDiv.parentNode;
        if (beforeDiv)
            container.insertBefore(beforeDiv, parentDiv);
        container.insertBefore(wrapper, parentDiv);
        if (afterDiv)
            container.insertBefore(afterDiv, parentDiv);
        // Удаляем исходный div
        container.removeChild(parentDiv);
        sel.removeAllRanges();
        resetButtons();
    };
}
function generateParagraph(button) {
    button.onclick = function () {
        var sel = window.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        var range = sel.getRangeAt(0);
        if (range.collapsed)
            return;
        // Находим исходный родительский div
        var parentDiv = range.startContainer;
        parentDiv = parentDiv.parentNode;
        if (!parentDiv)
            return;
        // Получаем полный текст исходного div
        var fullText = parentDiv.textContent;
        var nodeName = parentDiv.nodeName;
        console.log(parentDiv.parentElement.nodeName);
        if (parentDiv.parentElement.nodeName === 'OL') {
            range.surroundContents(document.createElement('p'));
            return;
        }
        // Получаем текст до, внутри и после выделения
        var before = fullText.slice(0, range.startOffset);
        var selected = range.toString();
        var after = fullText.slice(range.startOffset + selected.length);
        // Создаём новые элементы
        var beforeDiv = before ? document.createElement(nodeName) : null;
        if (beforeDiv)
            beforeDiv.textContent = before;
        var p = document.createElement('p');
        p.textContent = selected;
        var afterDiv = after ? document.createElement(nodeName) : null;
        if (afterDiv)
            afterDiv.textContent = after;
        // Вставляем перед старым div
        var container = parentDiv.parentNode;
        if (beforeDiv)
            container.insertBefore(beforeDiv, parentDiv);
        container.insertBefore(p, parentDiv);
        if (afterDiv)
            container.insertBefore(afterDiv, parentDiv);
        // Удаляем исходный div
        container.removeChild(parentDiv);
        sel.removeAllRanges();
    };
}
function generateMark(button) {
    button.addEventListener('click', function () {
        var sel = window.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        var range = sel.getRangeAt(0);
        if (range.collapsed)
            return;
        var parentDiv = range.startContainer;
        parentDiv = parentDiv.parentNode;
        if (!parentDiv)
            return;
        var selected = range.toString();
        if (range.endContainer === range.startContainer) {
            if (selected) {
                range.surroundContents(document.createElement('mark'));
            }
        }
        else {
            alert('Нельзя выделить mark в разных тегах');
        }
        sel.removeAllRanges();
        resetButtons();
    });
}
function generateStrong(button) {
    button.addEventListener('click', function () {
        var sel = window.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        var range = sel.getRangeAt(0);
        if (range.collapsed)
            return;
        var parentDiv = range.startContainer;
        parentDiv = parentDiv.parentNode;
        if (!parentDiv)
            return;
        var selected = range.toString();
        if (range.endContainer === range.startContainer) {
            if (selected) {
                range.surroundContents(document.createElement('strong'));
            }
        }
        else {
            alert('Нельзя выделить strong в разных тегах');
        }
        sel.removeAllRanges();
        resetButtons();
    });
}
function generateExample(button) {
    button.onclick = function () {
        var sel = window.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        var range = sel.getRangeAt(0);
        if (range.collapsed)
            return;
        // Находим исходный родительский div
        var parentDiv = range.startContainer;
        parentDiv = parentDiv.parentNode;
        if (!parentDiv)
            return;
        // Получаем полный текст исходного div
        var fullText = parentDiv.textContent;
        var nodeName = parentDiv.nodeName;
        // Получаем текст до, внутри и после выделения
        var before = fullText.slice(0, range.startOffset);
        var selected = range.toString();
        var after = fullText.slice(range.startOffset + selected.length);
        var beforeDiv = before ? document.createElement(nodeName) : null;
        if (beforeDiv)
            beforeDiv.textContent = before;
        var p = document.createElement('div');
        p.classList.add('bg-gray');
        p.classList.add('p-4');
        p.classList.add('img-rounded');
        p.classList.add('my-5');
        p.textContent = selected;
        var afterDiv = after ? document.createElement(nodeName) : null;
        if (afterDiv)
            afterDiv.textContent = after;
        var container = parentDiv.parentNode;
        if (beforeDiv)
            container.insertBefore(beforeDiv, parentDiv);
        container.insertBefore(p, parentDiv);
        if (afterDiv)
            container.insertBefore(afterDiv, parentDiv);
        container.removeChild(parentDiv);
        sel.removeAllRanges();
    };
}
function generateList(button, type) {
    button.addEventListener('click', function () {
        var sel = window.getSelection();
        if (!sel || sel.rangeCount === 0)
            return;
        var range = sel.getRangeAt(0);
        if (range.collapsed)
            return;
        var ul = document.createElement(type);
        ul.classList.add('list');
        var elems = [];
        if (!sel.isCollapsed) {
            elems = getRangeSelectedNodes(sel.getRangeAt(0));
        }
        console.log(elems);
        elems = elems.filter(function (item) { return item.nodeName !== '#text'; });
        elems.forEach(function (item) {
            ul.insertAdjacentHTML('beforeend', "<li>".concat(item.innerHTML, "</li>"));
        });
        var insertElement = elems[0];
        while (insertElement.parentElement.nodeName !== 'DIV') {
            insertElement = insertElement.parentElement;
        }
        insertElement.insertAdjacentElement('beforebegin', ul);
        elems.forEach(function (item) { return item.remove(); });
        sel.removeAllRanges();
        resetButtons();
    });
}
// ! функция для выявления узлов внутри выделения
function getRangeSelectedNodes(range) {
    var startNode = range.startContainer;
    var endNode = range.endContainer;
    var commonAncestor = range.commonAncestorContainer;
    var rangeNodes = [];
    var node = commonAncestor.firstChild;
    var inRange = false;
    while (node) {
        if (node === startNode || node.contains(startNode)) {
            inRange = true;
        }
        if (inRange) {
            rangeNodes.push(node);
        }
        if (node === endNode || node.contains(endNode)) {
            break;
        }
        node = node.nextSibling;
    }
    return rangeNodes;
}
document.onselectionchange = function () {
    var selection = document.getSelection();
    var panel = document.querySelector('.main-tools');
    console.log(selection.toString());
    if (selection.toString()) {
        var coords = selection.anchorNode.parentNode.getBoundingClientRect();
        console.log(coords);
        panel.style.top = coords.top - 50 + 'px';
        panel.style.left = coords.left + 'px';
        panel.style.display = 'block';
    }
    else {
        panel.style.display = 'none';
    }
};
// ! button elements
// header
var headersButtons = document.querySelectorAll("[data-action*='header-']");
headersButtons.forEach(function (elem) {
    var attribute = elem.dataset.action.replace('header-', '');
    if (+attribute) {
        generateTitle(elem, "h".concat(attribute), +attribute);
    }
});
// paragraph
var paragraphButton = document.querySelector('[data-action="paragraph"]');
generateParagraph(paragraphButton);
// mark
var markButton = document.querySelector('[data-action="mark"]');
generateMark(markButton);
// strong
var strongButton = document.querySelector('[data-action="strong"]');
generateStrong(strongButton);
// example block
var exampleButton = document.querySelector('[data-action="example"]');
generateExample(exampleButton);
// unnumeric list
var unnumericListButton = document.querySelector('[data-action="list-ul"]');
generateList(unnumericListButton, 'ul');
// numeric list
var unmericListButton = document.querySelector('[data-action="list-ol"]');
generateList(unmericListButton, 'ol');
// * editor validation
var editor = document.getElementById('editor');
editor.addEventListener('input', function () {
    var sel = window.getSelection();
    if (editor.firstChild &&
        editor.firstChild.nodeType === Node.TEXT_NODE) {
        var wrapper = document.createElement('p');
        wrapper.textContent = editor.firstChild.textContent;
        editor.replaceChild(wrapper, editor.firstChild);
        // Переносим курсор в конец нового div
        var newRange = document.createRange();
        newRange.setStart(wrapper.firstChild, 1);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
    }
});
// ! validate code from google word
function validateP(item) {
    var span = item.querySelectorAll('& > *');
    if (span.length === 2) {
        if (span[0].style.fontWeight === '700') {
            var p = document.createElement('p');
            var strong = document.createElement('strong');
            strong.innerHTML = span[0].innerHTML;
            p.insertAdjacentHTML('beforeend', "<strong>".concat(span[0].innerHTML, "</strong>").concat(span[1].innerHTML));
            item.insertAdjacentElement('beforebegin', p);
            item.remove();
        }
    }
    else {
        var result_1 = '';
        span.forEach(function (tag) {
            if (tag.nodeName === 'A') {
                var link = tag;
                result_1 += "<a href=".concat(link.href, ">").concat(link.querySelector('span').innerHTML, "</a>");
            }
            if (tag.style.fontSize === '11pt' &&
                tag.style.fontWeight === '') {
                result_1 += tag.innerHTML;
            }
        });
        var p = document.createElement('p');
        p.insertAdjacentHTML('beforeend', result_1);
        item.insertAdjacentElement('beforebegin', p);
        item.remove();
    }
}
function validateLi(item, obj, ol_obj) {
    var list = item.parentNode;
    if (!list.id)
        return;
    if (list.id.includes('ul')) {
        if (obj[list.id])
            obj[list.id] = __spreadArray(__spreadArray([], obj[list.id], true), [item], false);
        else
            obj[list.id] = [item];
    }
    else {
        if (ol_obj[list.id])
            ol_obj[list.id] = __spreadArray(__spreadArray([], ol_obj[list.id], true), [item], false);
        else
            ol_obj[list.id] = [item];
    }
}
function createNewLists(obj, list) {
    var keys = Object.keys(obj);
    keys.forEach(function (item) {
        var lis = obj[item];
        var old_ul = document.getElementById(item);
        if (!old_ul)
            return;
        var new_ul = document.createElement(list);
        new_ul.classList.add('list');
        lis.forEach(function (elem) {
            new_ul.insertAdjacentHTML('beforeend', "<li>".concat(elem.innerHTML, "</li>"));
        });
        old_ul.insertAdjacentElement('beforebegin', new_ul);
        old_ul.remove();
    });
}
function validateDiv(item) {
    // определяем линии
    var table = item.querySelector('table');
    console.log(table.querySelector('td').innerHTML);
    if (table.querySelectorAll('td').length === 1 &&
        table.querySelector('td').innerHTML === '') {
        var hr = document.createElement('hr');
        item.insertAdjacentElement('beforebegin', hr);
        item.remove();
    }
}
function validateTitle(item) {
    var title = item.nodeName;
    var newTitle = document.createElement(title);
    if (title === TITLES.H3) {
        newTitle.classList.add('heading-style-4');
        newTitle.classList.add('bold');
    }
    else {
        newTitle.classList.add("heading-style-".concat(TITLES[title]));
        newTitle.classList.add('bold');
    }
    newTitle.innerHTML = item.querySelector('span').innerHTML;
    item.insertAdjacentElement('beforebegin', newTitle);
    item.remove();
}
function validateText() {
    var elems = editor.querySelectorAll('[dir="ltr"]');
    var uls = editor.querySelectorAll('ul');
    var ols = editor.querySelectorAll('ol');
    uls.forEach(function (item, idx) {
        item.id = "google-ul-".concat(idx);
    });
    ols.forEach(function (item, idx) {
        item.id = "google-ol-".concat(idx);
    });
    var uls_divider = {};
    var ols_divider = {};
    var brs = editor.querySelectorAll('br');
    brs.forEach(function (item) { return item.remove(); });
    elems.forEach(function (item) {
        if (item.nodeName === 'P')
            validateP(item);
        else if (item.nodeName === 'LI')
            validateLi(item, uls_divider, ols_divider);
        else if (item.nodeName === 'DIV')
            validateDiv(item);
        else if (item.nodeName.indexOf('H') > -1)
            validateTitle(item);
    });
    createNewLists(uls_divider, 'ul');
    createNewLists(ols_divider, 'ol');
}
var googleButton = document.querySelector('.main-field__button.google');
googleButton.addEventListener('click', validateText);
var copyHTML = document.querySelector('.main-field__button.html');
copyHTML.addEventListener('click', function () {
    var html = editor.outerHTML; // берём сам элемент с тегами
    navigator.clipboard
        .writeText(html)
        .then(function () {
        alert('HTML элемента скопирован в буфер обмена!');
    })
        .catch(function (err) {
        console.error('Ошибка копирования: ', err);
    });
});
