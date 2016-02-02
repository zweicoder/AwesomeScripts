function getZIndex(ele) {
    return ele.style.zIndex || getZIndex(ele.parentNode);
}

function cycleWithTab(doc, e) {
    if (e.keyCode == 9 && !e.repeat) {
        e.preventDefault();
        const delta = e.shiftKey ? 1 : -1,
            activeChat = doc.querySelector('.active'),
            items = doc.getElementsByClassName('infinite-list-item');
        var targetIdx;
        if (activeChat) {
            var zIndex = parseInt(getZIndex(activeChat)) + delta;
            for (var i = 0; i < items.length; i++) {
                if (items[i].style.zIndex == zIndex) {
                    targetIdx = i;
                }
            }
        } else {
            var lastMax = 0;
            for (var i = 0; i < items.length; i++) {
                var zIndex = items[i].style.zIndex;
                if (zIndex > lastMax) {
                    lastMax = zIndex;
                    targetIdx = i;
                }
            }
        }

        items[targetIdx].childNodes[0].childNodes[0].click();
        return false;
    }
}

function bindKeyListener(doc, e) {
    var fn = cycleWithTab.bind(null, doc);
    var existingListener = doc.onkeydown;
    doc.onkeydown = function (ev) {
        var res, res2;
        if (existingListener) {
            res = existingListener(ev);
        }
        res2 = fn(ev);
        // If either of the functions handled the event (it returned false), 
        // return false. Use AND
        return res && res2
    }
}

module.exports =  bindKeyListener;
