const $ = function (sel) {
    const nodeList = document.querySelectorAll(sel);
  
    const text = function (content) {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].textContent = content;
      }
    }
  
    const toggleClass = function (className) {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.toggle(className);
      }
    }

    const addNewClass = function (newClass) {
    //  nodeList.forEach(e => (!e.classList.some(ce => String(ce) === newClass))?e.className += newClass : 0);/**classList has not some */
      for (let i = 0; i < nodeList.length; i++) {
        let classNode = nodeList[i].classList;
        let checkClass = false;
          for (let j = 0; j < classNode.length; j++) {
            if(String(classNode[j]) === newClass)
              checkClass = true;
          }
          if(checkClass === false)
            nodeList[i].className +=  newClass;
        
      }
    }
  
    const on = function (action, cb) {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].addEventListener(action, cb);
      }
    }
  
    const val = function (content) {
        if(content === undefined){
          return nodeList[0].value; 
        } else {
          nodeList[0].value = content;
        }     
    }
  
    const html = function (content) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].innerHTML = content;
          }    
    }

    const empty = function () {
      for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].innerHTML = '';
        }    
  }

    const printAll = function(employeeList){
      employeeList.map(e => {render(`${e.name}`);render(`#${e.officeNum}`);render(`${e.phoneNum}`);breakLine();});
    }

    const breakLine = function(){
      nodeList.forEach(e => e.appendChild(document.createElement('br')));
    }

    const render = (...props) => {
      props.forEach(e => {  
        append(e);
      });
    }
  
    const append = content => {
      const p = document.createElement('p');
      p.textContent = content;
      nodeList.forEach(e => e.appendChild(p));
    }
  
  
    const publicAPI = {
      text: text,
      toggleClass: toggleClass,
      on: on,
      val: val,
      html: html,
      empty: empty,
      printAll: printAll,
      render: render,
      addNewClass: addNewClass
    }
  
    return publicAPI;
  
  }
  