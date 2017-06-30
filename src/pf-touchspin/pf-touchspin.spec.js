describe("Patternfly Touchspin Component Tests", function () {
  let customElement, downbtn, upbtn, input, eventCallback, result;

  function buildHtml(html) {
    template = document.createElement('template');
    template.innerHTML = html;
    document.body.appendChild(document.importNode(template.content, true));
  }
  beforeEach(function () {
    buildHtml('<pf-touchspin id="touchspin" class="input-group bootstrap-touchspin" min="0" max="100"><span class="input-group-btn"><button id="button-down" class="btn btn-default bootstrap-touchspin-down" type="button">-</button></span><input value="50" type="text" class="form-control"><span class="input-group-btn"><button class="btn btn-default bootstrap-touchspin-up" type="button">+</button></span></pf-touchspin>');
    customElement = document.querySelector('#touchspin');
    downbtn = document.querySelector(".bootstrap-touchspin-down");
    upbtn = document.querySelector(".bootstrap-touchspin-up");
    input = document.querySelector("input");
    eventCallback = {
      eventHandle: function () {
        document.dispatchEvent(new MouseEvent('mouseup'));
      },
      eventFakeHandle: function () { }
    };
    spyOn(eventCallback, 'eventHandle');
    spyOn(eventCallback, 'eventFakeHandle');
  });

  afterEach(function () {
    document.body.removeChild(customElement);
    downbtn = null;
    upbtn = null;
    input = null;
  });

  it("should decrement value on pf-touchspin.downonce event", function () {
    customElement.dispatchEvent(new CustomEvent('pf-touchspin.downonce', {}));
    expect(input.value).toEqual('49');
  });

  it("should increment value on pf-touchspin.uponce event", function () {
    customElement.dispatchEvent(new CustomEvent('pf-touchspin.uponce', {}));
    expect(input.value).toEqual('51');
  });

  it("should decrement value on down button mousedown", function () {
    downbtn.dispatchEvent(new MouseEvent('mousedown'));
    expect(input.value).toEqual('49');
  });

  it("should increment value on up button mousedown", function () {
    upbtn.dispatchEvent(new MouseEvent('mousedown'));
    expect(input.value).toEqual('51');
  });


  it("should fire pf-touchspin.startspin event on down button mousedown", function () {
    downbtn.dispatchEvent(new MouseEvent('mousedown'));
    customElement.addEventListener('pf-touchspin.startspin', eventCallback.eventHandle());
    expect(eventCallback.eventHandle).toHaveBeenCalled();
  });

  it("should fire pf-touchspin.max event", function () {
    input.value = 100;
    upbtn.dispatchEvent(new MouseEvent('mousedown'));
    customElement.addEventListener('pf-touchspin.max', eventCallback.eventHandle());
    expect(eventCallback.eventHandle).toHaveBeenCalled();
  });

  it("should fire pf-touchspin.min event", function () {
    input.value = 0;
    downbtn.dispatchEvent(new MouseEvent('mouseup'));
    customElement.addEventListener('pf-touchspin.min', eventCallback.eventHandle());
    expect(eventCallback.eventHandle).toHaveBeenCalled();
  });

  it("should fire pf-touchspin.stopspin on down button mouseup", function (done) {
    downbtn.dispatchEvent(new MouseEvent('mousedown'));
    document.dispatchEvent(new MouseEvent('mouseup'));
    customElement.addEventListener('pf-touchspin.stopspin', eventCallback.eventFakeHandle());
    expect(eventCallback.eventFakeHandle).toHaveBeenCalled();
    done();
  });
});