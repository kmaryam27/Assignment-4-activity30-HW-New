/***************************************************clean main tag header forms */
const cleanPage = function(){
  $('#verifyDiv').addNewClass(' nonVisible');
  $('#lookupDiv').addNewClass(' nonVisible');
  $('#containsDiv').addNewClass(' nonVisible');
  $('#updateDiv').addNewClass(' nonVisible');
  $('#addDiv').addNewClass(' nonVisible');
  $('#deleteDiv').addNewClass(' nonVisible');
  $('#arrangeDiv').addNewClass(' nonVisible');
  }

/******************************************************clean content div for input new data*/
  const cleanContent = function(){
    $('#content').empty();
    $('#content').addNewClass('centerContent');
  }

/******************************************************clean Page on load */
cleanPage();
cleanContent();

/********************************************************add click event for aside btns */
let commandSelected = document.querySelectorAll('aside section div');

commandSelected.forEach(element => {
  element.style.cursor = "pointer";/**********pointer */

  element.addEventListener('click', function(){
    cleanPage();
    cleanContent();
    event.preventDefault();
    
    let cmd = element.getAttribute('id');

    if (cmd === 'print') {//if client types print
      $('#content').toggleClass('centerContent');
      $('#content').printAll(employeeList);
     } 
     else if (cmd === 'verify') //if client types verify
      $('#verifyDiv').toggleClass('nonVisible');
     else if (cmd === 'lookup')//if client types lookup
      $('#lookupDiv').toggleClass('nonVisible');
    else if(cmd === 'contains')//if client types contains
      $('#containsDiv').toggleClass('nonVisible');
     else if(cmd === 'update')//if client types update
      $('#updateDiv').toggleClass('nonVisible');
    else if(cmd === 'add')//if client types add
      $('#addDiv').toggleClass('nonVisible');
    else if(cmd === 'delete')//if client types delete
      $('#deleteDiv').toggleClass('nonVisible');
    else if (cmd === 'arrange')//if client types arrange
      $('#arrangeDiv').toggleClass('nonVisible');
  });
});
//***************************************************************Verify */

$('#verifySubmit').on('click', function(){
  cleanContent();
  event.preventDefault();
  
  const inputName = $('#verifyInput').val();
  let checkEmployee = 'Employee Not Found';
    
  if(employeeList.some(e => (inputName.toUpperCase() === (e.name).toUpperCase()))) 
    checkEmployee = 'Employee Found';

    $('#content').render(checkEmployee);
});

/****************************************************************Lookup */
$('#lookupSubmit').on('click', function(){
  cleanContent();
  event.preventDefault();

  const inputName = $('#lookupInput').val();
  const eList = employeeList.filter(e => inputName.toUpperCase() === e.name.toUpperCase());
  (eList.length > 0)?$('#content').printAll(eList): $('#content').render('Employee Not Found');
     
});
/****************************************************************Contains */
$('#containsSubmit').on('click', function(){
  cleanContent();
  event.preventDefault();

  const str = $('#containsInput').val();
  const eList = employeeList.filter(e => e.name.toUpperCase().includes(str.toUpperCase()));
  (eList.length > 0)?$('#content').printAll(eList): $('#content').render('Employee Not Found');
      
});
/****************************************************************update */
$('#updateSubmit').on('click', function(){
  cleanContent();
  event.preventDefault();

  const inputName = $('#updateNameInput').val();
  const inputNum = $('#updateNumInput').val();
  const inputPhone = $('#updatePhoneInput').val();
  let eList =[];
  if(employeeList.find(e =>((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone == e.phoneNum))))
     $('#content').render('Employee already exist');
  else{
  eList =  employeeList.filter(e =>((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum != e.officeNum)&&(inputPhone != e.phoneNum))||
                                  ((inputName.toUpperCase() !== e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone != e.phoneNum))||
                                  ((inputName.toUpperCase() !== e.name.toUpperCase())&&(inputNum != e.officeNum)&&(inputPhone == e.phoneNum)));

   if(eList.length === 1){
    eList[0].name = inputName;
    eList[0].phoneNum = inputPhone;
    eList[0].officeNum = inputNum;
    $('#content').printAll(eList);
   }else {
    eList = employeeList.filter(e =>((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone != e.phoneNum))||
                                     ((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum != e.officeNum)&&(inputPhone == e.phoneNum))||
                                     ((inputName.toUpperCase() !== e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone == e.phoneNum)));
  
    if(eList.length === 1) {
    eList[0].name = inputName;
    eList[0].phoneNum = inputPhone;
    eList[0].officeNum = inputNum;
    $('#content').printAll(eList);
  }else if(eList.length> 1)
  $('#content').render('more than one Employee with this information for update');
  else
  $('#content').render('Employee Not Found');
  }
}
});
/*******************************************************************add */
$('#addSubmit').on('click', function(){
  cleanContent();
  event.preventDefault();
  const inputName = $('#addNameInput').val();
  const   inputNum = $('#addNumInput').val();
  const inputPhone = $('#addPhoneInput').val();

      const employee = {
      name: inputName,
      phoneNum: inputPhone,
      officeNum: inputNum
    };
    const eList = employeeList.filter(e => ((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone == e.phoneNum)));

    if(eList.length > 0){
      $('#content').render('Employee added before');
    }else{
      eList.push(employee);
      employeeList.push(employee);
      $('#content').printAll(eList);
    }
});
/***********************************************************************delete */
$('#deleteSubmit').on('click', function(){
  cleanContent();
  event.preventDefault();

  const inputName = $('#deleteInput').val();
  if(employeeList.filter(e => e.name.toUpperCase() === inputName.toUpperCase())){
    let i = 0;
    let employeeCounter = 0;
    while ( i < employeeList.length) {
        if ((employeeList[i].name).toUpperCase() === inputName.toUpperCase()) {
          employeeCounter ++;
          employeeList.splice(i,1);
        }else
          i++; 
      } 
      $('#content').render(employeeCounter + ' Employee Deleted');   
  }else
      $('#content').render('Employee Not Found')
});
/**************************************************************************arrange */
$('#arrangeSubmit').on('click', function(){
  cleanContent();
  event.preventDefault();

  const field = $('#arrangeCombo').val();
  if (field == 0) {
    employeeList.sort(function(a, b){
      let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
      if (nameA < nameB) //sort string ascending
          return -1;
      if (nameA > nameB)
          return 1;
      return 0; //default return value (no sorting)
  });
  }
  else{
    employeeList.sort(function(a, b){
      return a.officeNum-b.officeNum;
  });
  }
  $('#content').printAll(employeeList);
});