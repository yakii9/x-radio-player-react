export function findElPosition(el) {
  let box;

  if (el.getBoundingClientRect && el.parentNode) {
    box = el.getBoundingClientRect();
  }

  if (!box) {
    return {
      left: 0,
      top: 0
    };
  }

  const { body, documentElement: docEl } = document;

  const clientLeft = docEl.clientLeft || body.clientLeft || 0;
  const scrollLeft = window.pageXOffset || body.scrollLeft;
  const left = box.left + scrollLeft - clientLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const scrollTop = window.pageYOffset || body.scrollTop;
  const top = box.top + scrollTop - clientTop;

  return {
    left: Math.round(left),
    top: Math.round(top)
  };
}

export function getPointerPosition(el, event) {
  const position = {};
  const box = findElPosition(el);
  const boxW = el.offsetWidth;
  const boxH = el.offsetHeight;

  const boxY = box.top;
  const boxX = box.left;
  let evtPageY = event.pageY;
  let evtPageX = event.pageX;

  if (event.changedTouches) {
    evtPageX = event.changedTouches[0].pageX;
    evtPageY = event.changedTouches[0].pageY;
  }

  position.y = Math.max(0, Math.min(1, (boxY - evtPageY + boxH) / boxH));
  position.x = Math.max(0, Math.min(1, (evtPageX - boxX) / boxW));

  return position;
}

// blur an element
export function blurNode(reactNode) {
  if (reactNode && reactNode.blur) {
    reactNode.blur();
  }
}

// focus an element
export function focusNode(reactNode) {
  if (reactNode && reactNode.focus) {
    reactNode.focus();
  }
}

export function hasClass(elm, cls) {
  const classes = elm.className.split(' ');
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].toLowerCase() === cls.toLowerCase()) {
      return true;
    }
  }
  return false;
}
