
$("#kk").click(function() {
onSubmit();
});

  




/* HELPERS */
/*back*/
$("#back").click(function(){
              back();
            });




function onSubmit() {
    noOfCou = $("#CourseNum").val();
     console.log("# INPUTED ,"+noOfCou);
    //unhide the hidden division
  function onhide() {
    $("#results").css("display","block");
   // $("body").css("background-color","#f1c40f");
    };
  onhide();

   function dispGpForm() {
    var cRow = '';
    cCodeArr = [];
    cTitleArr = [];
    cCreditArr = [];
     cGradeArr = [];
  
  

    //displays until inputed no is outputed.
    function doLoop() {
      for(var i = 1;(i <= noOfCou); i++) {
        
        cCodeArr[i] = 'cCode' + i;
        cTitleArr[i] = 'cTitle' + i;
        cCreditArr[i] = 'cCredit' + i;
        cGradeArr[i] = 'cGrade' + i;
        var course = 'Course'+ i;

        var cCode = "<p><span>"+course+"</span><input  class='error span3' size='7' placeholder='CourseCode' type='text' id=" + cCodeArr[i] + " name=" + cCodeArr[i] + " >";
        var cCredit = "<select class='span3'  id=" + cCreditArr[i] + " name=" + cCreditArr[i] + "><option value=1>1</option><option value=2 selected>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
        var cGrade = "<select class='span3'id=" + cGradeArr[i] + " name=" + cGradeArr[i] + "><option value=5>A</option><option value=4>B</option><option value=3>C</option><option value=2>D</option><option value=1>E</option><option value=0>F</option></select></p>";
        
        cRow = cRow + cCode +'<br/>'  + cCredit+ '<br/>'  + cGrade;
        header = 'CourseCode | CreditLoad | Grade';
        formStrt = '<form id=\'Gpform\' action=\'#\'>';
        formEnd = '</form>';
        submitButton = '<button id=\'submitGpForm\' class=\'btn btn-block  btn-new \' >Calculate</button>';
        var resultsDiv = $('#results'); 

        
      };
      resultsDiv.html(formStrt +header+ '<hr/>' + cRow + submitButton + formEnd);
       console.log("FORM GENERATED\n "+cRow);
    };
    doLoop(); 
  
  };
  dispGpForm();
  return false;
};

$("#Gpform").live('submit', function(){
//@ form submit app stores the values as cookies & calculates
        var cRow="";
        var prod=[];
        var cHour= 0;
        var cProd = 0;
      for(var i = 1;(i <= noOfCou); i++) {
        //Processing Course Code

        var CourseCode = "#"+cCodeArr[i];
        cc = $(CourseCode).val();
        ccf = "<tr><td>"+cc+"</td>";
       
          //Processing Course Title
        var CourseTitle = "#"+cTitleArr[i];
        ct = $(CourseTitle).val();
        ctf = "<td>"+ct+"</td>";
        
         //Processing Course Credit
        var CourseCredit = "#"+cCreditArr[i];
        cd = parseInt($(CourseCredit).val(),10);
        cdf = "<td>"+cd+"</td>";
         
         //Processing Course Grade
        var CourseGrade = "#"+cGradeArr[i];
        cg = parseInt($(CourseGrade).val(),10);
        cgf = "<td>"+cg+"</td></tr>";
        
        //CreditHour*GradeWeight | TotalPointGrade
        prod[i] = parseInt(cd*cg,10);
        cProd = parseInt(cProd+prod[i],10);

        //TotalCreditHour
        cHour = parseInt(cHour+cd,10);
        
        //TableGenerator       
        cRow = cRow + ccf + cdf + cgf;
       // window.localStorage.scRow = cRow;
          };//loop end

         cTot = "<tr style='font-weight:bold;'><td>TOTAL</td><td>"+cHour+"</td><td>"+cProd+"</td></tr>";
          Gpa = parseFloat(cProd/cHour,10);
          Gpa = Gpa.toFixed(2);
          window.localStorage.gpfc = Gpa;
      
          cGpa = "Your Gross Point Average is:  <span>"+Gpa+"</span>";
           console.log(cGpa);
           console.log("TABLES CREATED!\n |"+cRow); 
           $("#first").hide();
          $("#second").css("display","block");
          $("tbody").append(cRow);
          $("tbody").append(cTot);
          $("#gpShw").append(cGpa);
         
               var cssObj = {
              "color":"#fff",
              "font-size": "32pt",
              "text-align":"center"
              }
          $("span:parent(h6)").css(cssObj);
          
       
//advice
         if (window.localStorage.gpfc2>=4.5){
          advice = "DISTINCTION!! <br/>"; 
         }else if (window.localStorage.gpfc2>=3.5){
           advice = "CREDIT! <br/> "; 
         }else if (window.localStorage.gpfc2>=2.5){
           advice = "MERIT! <br/> ";
         }else if (window.localStorage.gpfc2>=1){
           advice = "PASS <br/>"; 
         }else {
           advice = "FAIL <br/>"; }
                    
$(".advice").append(advice);
         console.log(advice);
       
return false;
});



function again(){
  $("#second").hide();
  $("#first").show();
}