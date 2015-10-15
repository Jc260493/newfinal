
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {









    populateViewTable();
    populateViewTableW();
    populateViewTableC();
    populateViewTableS();
    populateDeleteTable();
    populateUserPayTable();
    populateTimeCardTable();
    populatePayCardTable();
    populateChargeTable();
    populateUnionEmpTable();
    populateUnionTable();
    populatePostponedTimeCardTable();
    populatePayInfoTable();
    changeUserInfo();
    showLogout();

    $('#btnLogin').on('click', login);

    $('#btnTest').on('click', test);

    $('#btnPostCharge').on('click', postCharge);

    $('#btnChangePassword').on('click', changePassword);

    $('#btnPostReceipt').on('click', postReceipt);

    $('#btnPostTimeCard').on('click', postTimeCard);

    $('#btnAddEmpToUnion').on('click', addEmpToUnion);

    $('#userList6 table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

    $('#timeCards table tbody').on('click', 'td a.accepttimecard', acceptTimeCard);

    $('#unionList table tbody').on('click', 'td a.addnewunion', showAddUnion);

    //$('#userListUnion table tbody').on('click', 'td a.addtounion', addToUnionPrep);

    $('#timeCards table tbody').on('click', 'td a.postponetimecard', postponeTimeCard);

    $('#payCards table tbody').on('click', 'td a.emailpaycard', emailPayCard);

    //$('#userListUnion table tbody').on('click', 'td a.addtounion', addToUnion);

    $('#addEmpToUnion').on('click', 'a.viewallemps', viewEmpList);
    $('#postCharge').on('click', 'a.viewallemps', viewEmpList);

    $('#addEmpToUnion').on('click', 'a.viewallunions', viewUnionList);
    $('#postCharge').on('click', 'a.viewallunions', viewUnionList);



    $('#btnPayEmployees').on('click', payEmployees);

    $('#btnResetPassword').on('click', resetPassword);

    $('#btnFilterEmp').on('click', filterEmployees);

    $('#btnFilterUnion').on('click', filterUnions);


    $('#viewType table tbody').on('click', 'td a.W', viewWeekly);
    $('#viewType table tbody').on('click', 'td a.C', viewCommision);
    $('#viewType table tbody').on('click', 'td a.S', viewSalary);
    $('#viewType table tbody').on('click', 'td a.A', viewAll);

    $('#filterType table tbody').on('click', 'td a.Emp', viewEmpFilter);
    $('#filterType table tbody').on('click', 'td a.Union', viewUnionFilter);
    $('#filterType table tbody').on('click', 'td a.All', viewAllFilter);

    $('#btnAddUnion').on('click', addUnion);


    $('#chooseType table tbody').on('click', 'td a.W', showWeekly);
    $('#btnAddWeeklyUser').on('click', addWeekly);
    
    $('#chooseType table tbody').on('click', 'td a.C', showCommision);
    $('#btnAddCommisionUser').on('click', addCommision);

    $('#chooseType table tbody').on('click', 'td a.S', showSalary);
    $('#btnAddSalaryUser').on('click', addSalary);





    //$('#userList5 table tbody').on('click', 'td a.linkupdateuser', changeUserInfo);
    $('#updateUser input').on('change', function(){$(this).addClass('updated')});
    $('#btnUpdateUser').on('click', updateUser);
    
    $('#userList12 table tbody').on('click', 'td a.linkupdateuser1', changeUserPayWeekly);
    $('#updateUserW input').on('change', function(){$(this).addClass('updated')});
    $('#btnUpdatePayType1').on('click', updateUserPayW);

    $('#userList12 table tbody').on('click', 'td a.linkupdateuser2', changeUserPayCommision);
    $('#updateUserC input').on('change', function(){$(this).addClass('updated')});
    $('#btnUpdatePayType2').on('click', updateUserPayC);

    $('#userList12 table tbody').on('click', 'td a.linkupdateuser3', changeUserPaySalary);
    $('#updateUserS input').on('change', function(){$(this).addClass('updated')});
    $('#btnUpdatePayType3').on('click', updateUserPayS);

});

// Functions =============================================================































function populateViewTable() {

    var tableContent = '';

    $.getJSON( '/users/userlisttest', function( data ) {


    userListData = data;


        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.firstname + '</td>';
            tableContent += '<td>' + this.initial + '</td>';
            tableContent += '<td>' + this.lastname + '</td>';
            tableContent += '<td>' + this.DOB + '</td>';
            tableContent += '<td>' + this.streetnumber + '</td>';
            tableContent += '<td>' + this.street + '</td>';
            tableContent += '<td>' + this.suburb + '</td>';
            tableContent += '<td>' + this.contact + '</td>';
            tableContent += '<td>' + this.gender + '</td>';
            tableContent += '<td>' + this.paytype + '</td>';
            tableContent += '<td>' + this.weeklyrate + '</td>';
            tableContent += '<td>' + this.commisionrate + '</td>';
            tableContent += '<td>' + this.annualrate + '</td>';
            tableContent += '<td>' + this.targethours + '</td>';
            tableContent += '</tr>';
        });

        $('#userList table tbody').html(tableContent);

    });
};






function populateUnionTable() {

    var tableContent = '';

    $.getJSON( '/users/unionlist', function( data ) {


        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.union + '</td>';
            tableContent += '<td>' + this.description + '</td>';
            tableContent += '</tr>';
        });

            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="addnewunion">Add New Union</a></td>';
            tableContent += '<td></td>';
            tableContent += '</tr>';

        $('#unionList table tbody').html(tableContent);

    });
};


function populateUnionEmpTable() {

    var tableContent = '';

    $.getJSON( '/users/userlist', function( data ) {


        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.firstname + ' ' + this.initial + ' ' + this.lastname + '</td>';
            tableContent += '</tr>';
        });

        $('#userListUnion table tbody').html(tableContent);

    });
};






function populatePayInfoTable() {

    var tableContent = '';
    var totalCount = 0;
    var totalValue = 0;
    var dueCount = 0;
    var dueValue = 0;
    var overdueCount = 0;
    var overdueValue = 0;
    var d = new Date;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var startHour =new Date(year,month,day,0,0,0,0).getTime();
    var endHour = startHour + 86400000;

    $.getJSON( '/users/topaylist', function( data ) {


    userListData = data;


        $.each(data, function(){
            totalValue = totalValue + this.amount;
            totalCount++;
            if(this.duedate > startHour && this.duedate < endHour){
                dueCount++;
                dueValue = dueValue + this.amount;
            }else if(this.duedate < endHour){
                overdueCount++;
                overdueValue = overdueValue + this.amount;
            }
            
        });

            tableContent += '<tr>';
            tableContent += '<td>' + '#' + '</td>';
            tableContent += '<td>' + totalCount + '</td>';
            tableContent += '<td>' + dueCount + '</td>';
            tableContent += '<td>' + overdueCount + '</td>';
            tableContent += '</tr>';
            tableContent += '<tr>';
            tableContent += '<td>' + '$' + '</td>';
            tableContent += '<td>' + totalValue + '</td>';
            tableContent += '<td>' + dueValue + '</td>';
            tableContent += '<td>' + overdueValue + '</td>';
            tableContent += '</tr>';

        $('#payInfo table tbody').html(tableContent);

    });
};















function populateViewTableW() {

    var tableContent = '';

    $.getJSON( '/users/userlistw', function( data ) {




        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.firstname + '</td>';
            tableContent += '<td>' + this.initial + '</td>';
            tableContent += '<td>' + this.lastname + '</td>';
            tableContent += '<td>' + this.DOB + '</td>';
            tableContent += '<td>' + this.streetnumber + '</td>';
            tableContent += '<td>' + this.street + '</td>';
            tableContent += '<td>' + this.suburb + '</td>';
            tableContent += '<td>' + this.contact + '</td>';
            tableContent += '<td>' + this.gender + '</td>';
            tableContent += '<td>' + this.paytype + '</td>';
            tableContent += '<td>' + this.weeklyrate + '</td>';
            tableContent += '</tr>';
        });

        $('#userListW table tbody').html(tableContent);
    });
};


function populateViewTableC() {

    var tableContent = '';

    $.getJSON( '/users/userlistc', function( data ) {



        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.firstname + '</td>';
            tableContent += '<td>' + this.initial + '</td>';
            tableContent += '<td>' + this.lastname + '</td>';
            tableContent += '<td>' + this.DOB + '</td>';
            tableContent += '<td>' + this.streetnumber + '</td>';
            tableContent += '<td>' + this.street + '</td>';
            tableContent += '<td>' + this.suburb + '</td>';
            tableContent += '<td>' + this.contact + '</td>';
            tableContent += '<td>' + this.gender + '</td>';
            tableContent += '<td>' + this.paytype + '</td>';
            tableContent += '<td>' + this.commisionrate + '</td>';
            tableContent += '<td>' + this.annualrate + '</td>';
            tableContent += '<td>' + this.targethours + '</td>';
            tableContent += '</tr>';
        });

        $('#userListC table tbody').html(tableContent);
    });
};

function populateViewTableS() {

    var tableContent = '';

    $.getJSON( '/users/userlists', function( data ) {




        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.firstname + '</td>';
            tableContent += '<td>' + this.initial + '</td>';
            tableContent += '<td>' + this.lastname + '</td>';
            tableContent += '<td>' + this.DOB + '</td>';
            tableContent += '<td>' + this.streetnumber + '</td>';
            tableContent += '<td>' + this.street + '</td>';
            tableContent += '<td>' + this.suburb + '</td>';
            tableContent += '<td>' + this.contact + '</td>';
            tableContent += '<td>' + this.gender + '</td>';
            tableContent += '<td>' + this.paytype + '</td>';
            tableContent += '<td>' + this.annualrate + '</td>';
            tableContent += '<td>' + this.targethours + '</td>';
            tableContent += '</tr>';
        });

        $('#userListS table tbody').html(tableContent);
    });
};






function populateUserPayTable() {

    var tableContent12 = '';

    $.getJSON( '/users/userlist', function( data ) {

        userListData5 = data;

        $.each(data, function(){
            tableContent12 += '<tr>';
            tableContent12 += '<td>' + this.email + '</td>';

            if(this.paytype == 'W'){
                tableContent12 += '<td></td>';
                tableContent12 += '<td><a href="#" class="linkupdateuser2" rel="' + this.email + '">Change</a></td>';
                tableContent12 += '<td><a href="' + this.email + '" class="linkupdateuser3" rel="' + this.email + '">Change</a></td>';
                tableContent12 += '<td><a href="#" class="linkupdateuser1" rel="' + this.email + '">Update</a></td>';
            }else if(this.paytype == 'C'){
                tableContent12 += '<td><a href="#" class="linkupdateuser1" rel="' + this.email + '">Change</a></td>';
                tableContent12 += '<td></td>';
                tableContent12 += '<td><a href="' + this.email + '" class="linkupdateuser3" rel="' + this.email + '">Change</a></td>';
                tableContent12 += '<td><a href="#" class="linkupdateuser2" rel="' + this.email + '">Update</a></td>';
            }else if(this.paytype == 'S'){
                tableContent12 += '<td><a href="#" class="linkupdateuser1" rel="' + this.email + '">Change</a></td>';
                tableContent12 += '<td><a href="#" class="linkupdateuser2" rel="' + this.email + '">Change</a></td>';
                tableContent12 += '<td></td>';
                tableContent12 += '<td><a href="' + this.email + '" class="linkupdateuser3" rel="' + this.email + '">Update</a></td>';
            }


            tableContent12 += '</tr>';
        });

        $('#userList12 table tbody').html(tableContent12);
    });
};


function populateDeleteTable() {

    var tableContent6 = '';

    $.getJSON( '/users/userlist', function( data ) {

        userListData6 = data;

        $.each(data, function(){
            tableContent6 += '<tr>';
            tableContent6 += '<td>' + this.email + '</td>';
            tableContent6 += '<td><a href="#" class="linkdeleteuser" rel="' + this.email + '">Delete</a></td>';
            tableContent6 += '</tr>';
        });

        $('#userList6 table tbody').html(tableContent6);
    });


};


function populateTimeCardTable() {

    var tableContentTC = '';

    $.getJSON( '/users/timecardlistaccepted', function( data ) {


    userListData15 = data;


        $.each(data, function(){
            tableContentTC += '<tr>';
            tableContentTC += '<td>' + this.email + '</td>';
            tableContentTC += '<td>' + this.amount + '</td>';
            tableContentTC += '<td>' + this.datelogged + '</td>';
            tableContentTC += '<td><a href="#" class="accepttimecard" rel="' + this.email + '">Accept</a></td>';
            tableContentTC += '<td><a href="#" class="postponetimecard" rel="' + this.email + '">Postpone</a></td>';
            tableContentTC += '</tr>';
        });

        $('#timeCards table tbody').html(tableContentTC);
    });
};


function populatePostponedTimeCardTable() {

    var tableContentTC = '';

    $.getJSON( '/users/timecardlistpostponed', function( data ) {


    userListData16 = data;


        $.each(data, function(){
            tableContentTC += '<tr>';
            tableContentTC += '<td>' + this.email + '</td>';
            tableContentTC += '<td>' + this.amount + '</td>';
            tableContentTC += '<td>' + this.datelogged + '</td>';
            tableContentTC += '<td><a href="#" class="acceptpptimecard" rel="' + this.email + '">Accept</a></td>';
            
        });

        $('#timeCards2 table tbody').html(tableContentTC);
    });
};

function populatePayCardTable() {

    var tableContent = '';

    $.getJSON( '/users/paycardlist', function( data ) {



        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.datepaid + '</td>';
            tableContent += '<td>' + this.empID + '</td>';
            tableContent += '<td>' + this.amount + '</td>';
            tableContent += '<td><a href="#" class="emailpaycard" rel="' + this._id + '">Email Copy</a></td>';
            tableContent += '</tr>';
        });

        $('#payCards table tbody').html(tableContent);
    });
};


function populateChargeTable() {

    var tableContent = '';

    $.getJSON( '/users/chargelist', function( data ) {


        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.date + '</td>';
            tableContent += '<td>' + this.empID + '</td>';
            tableContent += '<td>' + this.unionID + '</td>';
            tableContent += '<td>' + this.amount + '</td>';
            tableContent += '</tr>';
            

        });

        $('#unionCharges table tbody').html(tableContent);
    });
};

function populateChargeFilterEmpTable(employee) {

    var tableContent = '';

    $.getJSON( '/users/chargelist', function( data ) {


        $.each(data, function(){
            if(this.empID == employee){
                tableContent += '<tr>';
                tableContent += '<td>' + this.date + '</td>';
                tableContent += '<td>' + this.empID + '</td>';
                tableContent += '<td>' + this.unionID + '</td>';
                tableContent += '<td>' + this.amount + '</td>';
                tableContent += '</tr>';
            }
            

        });

        $('#unionCharges2 table tbody').html(tableContent);
    });
};


function populateChargeFilterUnionTable(union) {

    var tableContent = '';

    $.getJSON( '/users/chargelist', function( data ) {


        $.each(data, function(){
            if(this.unionID == union){
                tableContent += '<tr>';
                tableContent += '<td>' + this.date + '</td>';
                tableContent += '<td>' + this.empID + '</td>';
                tableContent += '<td>' + this.unionID + '</td>';
                tableContent += '<td>' + this.amount + '</td>';
                tableContent += '</tr>';
            }
            

        });

        $('#unionCharges3 table tbody').html(tableContent);
    });
};



function showLogout() {

    var tableContent = '';
    var count = 0;

    $.getJSON( '/users/getcurrent', function( data ) {


        $.each(data, function(){
            count++;
        });

        if(count > 0){
            $('#logout').toggle();
        }
    });
};




















function viewEmpList(event){
  event.preventDefault();


        if($('#userListUnion').is(":visible")){
            $('#userListUnion').toggle();
        }else{
            $('#userListUnion').toggle();
        }
}

function viewUnionList(event){
  event.preventDefault();


        if($('#unionList').is(":visible")){
            $('#unionList').toggle();
        }else{
            $('#unionList').toggle();
        }



}












function filterEmployees(event){
  event.preventDefault();


    var employee = $('#filterEmp fieldset input#inputEmail').val();

    if(employee == ''){
        populateChargeTable();
        if($('#unionCharges').is(":visible")){
        }else{
            $('#unionCharges').toggle();
        }

        if($('#unionCharges2').is(":visible")){
            $('#unionCharges2').toggle();
        }

        if($('#unionCharges3').is(":visible")){
            $('#unionCharges3').toggle();
        }
    }else{

        populateChargeFilterEmpTable(employee);

        if($('#unionCharges').is(":visible")){
            $('#unionCharges').toggle();
        }

        if($('#unionCharges2').is(":visible")){
        }else{
            $('#unionCharges2').toggle();
        }

        if($('#unionCharges3').is(":visible")){
            $('#unionCharges3').toggle();
        }
    }

}

function filterUnions(event){
  event.preventDefault();


    var union = $('#filterUnion fieldset input#inputEmail').val();


    if(union == ''){
        populateChargeTable();
        if($('#unionCharges').is(":visible")){
        }else{
            $('#unionCharges').toggle();
        }

        if($('#unionCharges2').is(":visible")){
            $('#unionCharges2').toggle();
        }

        if($('#unionCharges3').is(":visible")){
            $('#unionCharges3').toggle();
        }
    }else{

        populateChargeFilterUnionTable(union);

        if($('#unionCharges').is(":visible")){
            $('#unionCharges').toggle();
        }

        if($('#unionCharges2').is(":visible")){
            $('#unionCharges2').toggle();
        }

        if($('#unionCharges3').is(":visible")){
        }else{
            $('#unionCharges3').toggle();
        }
    }

}



function viewEmpFilter(event){
  event.preventDefault();


    $('#filterEmp').toggle();

    if($('#filterUnion').is(":visible")){
        $('#filterUnion').toggle();
    }

}

function viewUnionFilter(event){
  event.preventDefault();


    $('#filterUnion').toggle();

    if($('#filterEmp').is(":visible")){
        $('#filterEmp').toggle();
    }

}

function viewAllFilter(event){
  event.preventDefault();


        populateChargeTable();
        if($('#unionCharges').is(":visible")){
        }else{
            $('#unionCharges').toggle();
        }

        if($('#unionCharges2').is(":visible")){
            $('#unionCharges2').toggle();
        }

        if($('#unionCharges3').is(":visible")){
            $('#unionCharges3').toggle();
        }



    if($('#filterEmp').is(":visible")){
        $('#filterEmp').toggle();
    }

    if($('#filterUnion').is(":visible")){
        $('#filterUnion').toggle();
    }

}


function viewWeekly(event){
  event.preventDefault();


    $('#userListW').toggle();
    if($('#userListW').is(":visible")){
    }else{
        $('#userListW').toggle();
    }

    if($('#userListS').is(":visible")){
        $('#userListS').toggle();
    }

    if($('#userListC').is(":visible")){
        $('#userListC').toggle();
    }

    if($('#userList').is(":visible")){
        $('#userList').toggle();
    }
}

function viewCommision(event){
  event.preventDefault();


    $('#userListC').toggle();
    if($('#userListC').is(":visible")){
    }else{
        $('#userListC').toggle();
    }

    if($('#userListS').is(":visible")){
        $('#userListS').toggle();
    }

    if($('#userListW').is(":visible")){
        $('#userListW').toggle();
    }

    if($('#userList').is(":visible")){
        $('#userList').toggle();
    }
}

function viewSalary(event){
  event.preventDefault();


    $('#userListS').toggle();
    if($('#userListS').is(":visible")){
    }else{
        $('#userListS').toggle();
    }

    if($('#userListW').is(":visible")){
        $('#userListW').toggle();
    }

    if($('#userListC').is(":visible")){
        $('#userListC').toggle();
    }

    if($('#userList').is(":visible")){
        $('#userList').toggle();
    }
}

function viewAll(event){
  event.preventDefault();



    $('#userList').toggle();
    if($('#userList').is(":visible")){
    }else{
        $('#userList').toggle();
    }

    if($('#userListS').is(":visible")){
        $('#userListS').toggle();
    }

    if($('#userListC').is(":visible")){
        $('#userListC').toggle();
    }

    if($('#userListW').is(":visible")){
        $('#userListW').toggle();
    }
}


function showWeekly(event){
  event.preventDefault();
    $('#addWeekly').toggle();

    if($('#addSalary').is(":visible")){
        $('#addSalary').toggle();
    }

    if($('#addCommision').is(":visible")){
        $('#addCommision').toggle();
    }
}

function showCommision(event){
  event.preventDefault();


    $('#addCommision').toggle();

    if($('#addWeekly').is(":visible")){
        $('#addWeekly').toggle();
    }

    if($('#addSalary').is(":visible")){
        $('#addSalary').toggle();
    }
}

function showSalary(event){
  event.preventDefault();


    $('#addSalary').toggle();

    if($('#addWeekly').is(":visible")){
        $('#addWeekly').toggle();
    }

    if($('#addCommision').is(":visible")){
        $('#addCommision').toggle();
    }
}



function showAddUnion(event){
  event.preventDefault();

        $('#addUnion').toggle();

}












function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}








function addUnion(event){


  event.preventDefault();

    var errorCount = 0;
    $('#addUnion input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    var union = ($('#addUnion fieldset input#inputUnion').val()).toLowerCase();
    var description = $('#addUnion fieldset input#inputDescription').val();


    if(errorCount === 0) {


                var newUnion = {
                    'union': union,
                    'description': description,
                    'amount' : 0
                }

                $.ajax({
                    type: 'POST',
                    data: newUnion,
                    url: '/users/addunion',
                    dataType: 'JSON'
                }).done(function( response ) {

                    if (response.msg === '') {
                        $('#addUnion fieldset input').val('');
                        alert(union + ' added');
                        populateUnionTable();

                    }
                    else {
                        alert('Error: ' + response.msg);
                    }
                });



    } else {
        alert('Please fill in all fields');
        return false;
    }
}





function addEmpToUnion(event){

  event.preventDefault();

    var errorCount = 0;
    $('#addEmpToUnion input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    var emp = ($('#addEmpToUnion fieldset input#inputEmp').val()).toLowerCase();
    var union = $('#addEmpToUnion fieldset input#inputUnion').val().toLowerCase();
    var weekly = $('#addEmpToUnion fieldset input#inputDeduction').val();


    if(errorCount === 0) {


                var newEmpToUnion = {
                    'empID' : emp,
                    'union': union,
                    'deduction': weekly
                }

                $.ajax({
                    type: 'POST',
                    data: newEmpToUnion,
                    url: '/users/addemptounion',
                    dataType: 'JSON'
                }).done(function( response ) {

                    if (response.msg === '') {
                        $('#addEmpToUnion fieldset input').val('');
                        alert(emp + ' added to ' + union);
                        populateUnionTable();
                    }
                    else {
                        alert('Error: ' + response.msg);
                    }
                });



    } else {
        alert('Please fill in all fields');
        return false;
    }
}







function addWeekly(event){

  event.preventDefault();

    var errorCount = 0;
    $('#addWeekly input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    
    var email = $('#addWeekly fieldset input#inputEmail').val().toLowerCase();
    var firstname = $('#addWeekly fieldset input#inputFirstName').val();
    var initial = $('#addWeekly fieldset input#inputInitial').val();
    var lastname = $('#addWeekly fieldset input#inputLastName').val();
    var DOB = $('#addWeekly fieldset input#inputDOB').val();
    var streetnumber = $('#addWeekly fieldset input#inputNumber').val();
    var street = $('#addWeekly fieldset input#inputStreet').val();
    var suburb = $('#addWeekly fieldset input#inputSuburb').val();
    var contact = $('#addWeekly fieldset input#inputContact').val();
    var m = $('#addWeekly fieldset input[val=male]:checked').val();
    var f = $('#addWeekly fieldset input[val=female]:checked').val();
    if(m === 'on'){
        gender = 'm';
    }
    if(f === 'on'){
        gender = 'f';
    }
    var weeklyrate = parseFloat($('#addWeekly fieldset input#inputWeeklyPay').val());
    var password = firstname.charAt(0) + initial + lastname;
    var dupCheck = 0;


    $.getJSON( '/users/userlist', function( data ) {
        var dupCheck = 0;


        $.each(data, function(){
            if(String(this.email) === String(email)){
                dupCheck++;
                return false;
            }
        });



            if(errorCount === 0 && gender != '' && initial.length == 1 && weeklyrate > 0) {

          


            if(dupCheck === 0){

                if(validateEmail(email) == true){


                        var newUser = {
                            'firstname': firstname,
                            'initial': initial,
                            'lastname': lastname,
                            'DOB': DOB,
                            'streetnumber': streetnumber,
                            'street': street,
                            'suburb': suburb,
                            'contact': contact,
                            'email': email,
                            'password': password,
                            'gender' : gender,
                            'paytype' : 'W',
                            'weeklyrate' : weeklyrate,
                            'commisionrate' : 0,
                            'annualrate' : 0,
                            'targethours' : 0,
                            'admin' : 0,
                            'accountbalance' : (Math.floor(Math.random() * 300) + 1),
                            'duedate' : calcNextFriday()
                        }

                        newUserFull = 'Success, ' + 'Email: ' + email + ', Password: ' + password;

                        $.ajax({
                            type: 'POST',
                            data: newUser,
                            url: '/users/adduser',
                            dataType: 'JSON'
                        }).done(function( response ) {

                            if (response.msg === '') {


                                $('#addWeekly fieldset input').val('');
                                $('input[name=gender]').attr('checked',false);
                                alert(newUserFull);

                            }
                            else {
                                alert('Error: ' + response.msg);
                            }
                        });

                        
                }else{
                    window.alert('Invalid email');
                }


            }else{
                window.alert('Duplicate employee');
            }

        }else{
            alert('Please fill in all fields correctly');
        }

    });
      
}











function addCommision(event){

  event.preventDefault();



    var errorCount = 0;
    $('#addCommision input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    var email = $('#addCommision fieldset input#inputEmail').val().toLowerCase();
    var firstname = $('#addCommision fieldset input#inputFirstName').val();
    var initial = $('#addCommision fieldset input#inputInitial').val();
    var lastname = $('#addCommision fieldset input#inputLastName').val();
    var DOB = $('#addCommision fieldset input#inputDOB').val();
    var streetnumber = $('#addCommision fieldset input#inputNumber').val();
    var street = $('#addCommision fieldset input#inputStreet').val();
    var suburb = $('#addCommision fieldset input#inputSuburb').val();
    var contact = $('#addCommision fieldset input#inputContact').val();
    var m = $('#addCommision fieldset input[val=male]:checked').val();
    var f = $('#addCommision fieldset input[val=female]:checked').val();
    var gender = '';
    if(m === 'on'){
        gender = 'm';
    }
    if(f === 'on'){
        gender = 'f';
    }
    var commisionrate = parseFloat($('#addCommision fieldset input#inputCommision').val());
    var annualrate = parseFloat($('#addCommision fieldset input#inputAnnualRate').val());
    var targethours = parseFloat($('#addCommision fieldset input#inputTargetHours').val());
    var password = firstname.charAt(0) + initial + lastname;
    var dupCheck = 0;

    $.getJSON( '/users/userlist', function( data ) {


        $.each(data, function(){
            if(String(this.email) === String(email)){
                dupCheck++;
                return false;
            }
        });


        if(errorCount === 0 && gender != '' && initial.length == 1 && commisionrate > 0 && annualrate > 0 && targethours > 0) {

            if(dupCheck === 0){

                if(validateEmail(email) == true){

                    var newUser = {
                        'firstname': firstname,
                        'initial':initial,
                        'lastname': lastname,
                        'DOB': DOB,
                        'streetnumber': streetnumber,
                        'street': street,
                        'suburb': suburb,
                        'contact': contact,
                        'email': email,
                        'password': password,
                        'gender' : gender,
                        'paytype' : 'C',
                        'weeklyrate' : 0,
                        'commisionrate' : commisionrate,
                        'annualrate' : annualrate,
                        'targethours' : targethours,
                        'admin' : 0,
                        'accountbalance' : (Math.floor(Math.random() * 300) + 1),
                        'duedate' : calcLastDayOfFN()
                     }

                     JSON.stringify(newUser);
                


                newUserFull = 'Success, ' + 'Email: ' + email + ', Password: ' + password;

                $.ajax({
                    type: 'POST',
                    data: newUser,
                    url: '/users/adduser',
                    dataType: 'JSON'
                }).done(function( response ) {

                    if (response.msg === '') {


                        $('#addCommision fieldset input').val('');
                        alert(newUserFull);
                    }
                    else {
                        alert('Error: ' + response.msg);
                    }
                });


                }else{
                    alert('Invalid Email');
                }

            }else{
                alert('Duplicate Emaill');
            }


        } else {
            alert('Please fill in all fields correctly');
            return false;
        }

    });
}

















function addSalary(event){

  event.preventDefault();

    var errorCount = 0;
    $('#addSalary input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    var email = $('#addSalary fieldset input#inputEmail').val().toLowerCase();
    var firstname = $('#addSalary fieldset input#inputFirstName').val();
    var initial = $('#addSalary fieldset input#inputInitial').val();
    var lastname = $('#addSalary fieldset input#inputLastName').val();
    var DOB = $('#addSalary fieldset input#inputDOB').val();
    var streetnumber = $('#addSalary fieldset input#inputNumber').val();
    var street = $('#addSalary fieldset input#inputStreet').val();
    var suburb = $('#addSalary fieldset input#inputSuburb').val();
    var contact = $('#addSalary fieldset input#inputContact').val();
    var m = $('#addSalary fieldset input[val=male]:checked').val();
    var f = $('#addSalary fieldset input[val=female]:checked').val();
    var gender = '';
    if(m === 'on'){
        gender = 'm';
    }
    if(f === 'on'){
        gender = 'f';
    }
    var annualrate = parseFloat($('#addSalary fieldset input#inputAnnualRate').val());
    var targethours = parseFloat($('#addSalary fieldset input#inputTargetHours').val());
    var password = firstname.charAt(0) + initial + lastname;
    var dupCheck = 0;

    
    $.getJSON( '/users/userlist', function( data ) {


        $.each(data, function(){
            if(String(this.email) === String(email)){
                dupCheck++;
                return false;
            }
        });

    if(errorCount === 0 && gender != '' && initial.length == 1 && targethours > 0 && annualrate > 0) {

        if(dupCheck === 0){

            if(validateEmail(email) == true){

                var newUser = {
                    'firstname': firstname,
                    'initial': initial,
                    'lastname': lastname,
                    'DOB': DOB,
                    'streetnumber': streetnumber,
                    'street': street,
                    'suburb': suburb,
                    'contact': contact,
                    'email': email,
                    'password': password,
                    'gender' : gender,
                    'paytype' : 'S',
                    'weeklyrate' : 0,
                    'commisionrate' : 0,
                    'annualrate' :annualrate,
                    'targethours' : targethours,
                    'admin' : 0,
                    'accountbalance' : (Math.floor(Math.random() * 300) + 1),
                    'duedate' : calcLastDayOfMonth()
                 } 

            newUserFull = 'Success, ' + 'Email: ' + email + ', Password: ' + password;

            $.ajax({
                type: 'POST',
                data: newUser,
                url: '/users/adduser',
                dataType: 'JSON'
            }).done(function( response ) {

                if (response.msg === '') {
                    $('#addSalary fieldset input').val('');
                    alert(newUserFull);

                }
                else {
                    alert('Error: ' + response.msg);
                }
            });





                }else{
                    window.alert('Invalid email');
                }
            }else{
                alert('Duplicate Employee');
            }

    } else {
        alert('Please fill in all fields');
        return false;
    }
    });
}












function createNewPassword() {
    var password = '';
    var single = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i = 0; i < 6; i++){
        password += single.charAt(Math.floor(Math.random() * single.length));
    }
    return password;
}
































function updateUser(event){

  event.preventDefault();

    var confirmation = confirm('Are you sure you want to update this user?');

    if (confirmation === true) {
 


    var fieldsToBeUpdated = $('#updateUser input.updated');

    var updatedFields = {};
    $(fieldsToBeUpdated).each(function(){
        var key = $(this).attr('placeholder').replace(" ","").toLowerCase();
        var value = $(this).val();
        updatedFields[key]=value;
    })



    $.ajax({
      type: 'PUT',
      url: '/users/updateuser',
      data: updatedFields
    }).done(function( response ) {

      if (response.msg === '') {
        window.alert('Update sucessful');
      }
      else {
        window.alert('Error: ' + response.msg);
      }
      
    });
  }
  else {
    return false;
  }
}

function changeUserInfo() {



          $.getJSON( '/users/singleuserinfo', function( data ) {

          $.each(data, function(){



                    $('#updateFirstName').val(this.firstname);
                    $('#updateInitial').val(this.initial);
                    $('#updateLastName').val(this.lastname);
                    $('#updateNumber').val(this.streetnumber);
                    $('#updateStreet').val(this.street);
                    $('#updateSuburb').val(this.suburb);
                    $('#updateContact').val(this.contact);

                    $('#updateUser').attr('rel',this._id);


          });


        });


};







function updateUserPayW(event){

  event.preventDefault();

    var confirmation = confirm('Are you sure you want to update this user?');

    if (confirmation === true) {

        var _id = $(this).parentsUntil('div').parent().attr('rel');

        var fieldsToBeUpdated = $('#updateUserW input.updated');
          
        var updatedFields = {};
        $(fieldsToBeUpdated).each(function(){
            var key = $(this).attr('placeholder').replace(" ","").toLowerCase();
            var value = $(this).val();
            updatedFields[key]=value;
            updatedFields['commisionrate'] = 0;
            updatedFields['annualrate'] = 0;
            updatedFields['targethours'] = 0;
        })

        updatedFields['paytype'] = 'W';

        $.ajax({
          type: 'PUT',
          url: '/users/updateuserpayW/' + _id,
          data: updatedFields
        }).done(function( response ) {
          if (response.msg === '') {
            alert('Updated to Weekly');
          }
          else {
            alert('Error: ' + response.msg);
          }
          populateUserPayTable();
          $('#updateUserW').toggle();
        });
  }
  else {

    return false;
  }
}


function changeUserPayWeekly(event) {

  event.preventDefault();
  if($('#updateUserW').is(":visible")){
    }else{
      $('#updateUserW').toggle();
  }

  if($('#updateUserC').is(":visible")){
      $('#updateUserC').toggle();
  }

  if($('#updateUserS').is(":visible")){
      $('#updateUserS').toggle();
  }
  
  var email = $(this).attr('rel');

  $.getJSON( '/users/userlist', function( data ) {

          $.each(data, function(){

                    if(this.email == email){
                        $('#updateWeeklyPayW').val(this.weeklyrate);
                        $('#updateUserW').attr('rel',email);
                        return false;
                    }
          });
        });
};


function updateUserPayC(event){

  event.preventDefault();

    var confirmation = confirm('Are you sure you want to update this user?');

    if (confirmation === true) {

    var _id = $(this).parentsUntil('div').parent().attr('rel');

    var fieldsToBeUpdated = $('#updateUserC input.updated');
      
    var updatedFields = {};
    $(fieldsToBeUpdated).each(function(){
        var key = $(this).attr('placeholder').replace(" ","").toLowerCase();
        var value = $(this).val();
        updatedFields[key]=value;
    })

    updatedFields['weeklyrate'] = 0;
    updatedFields['paytype'] = 'C'

    $.ajax({
      type: 'PUT',
      url: '/users/updateuserpayC/' + _id,
      data: updatedFields
    }).done(function( response ) {
      if (response.msg === '') {
        alert('Updated to Commision');
      }
      else {
        alert('Error: ' + response.msg);
      }
      populateUserPayTable();
      $('#updateUserC').toggle();
    });
  }
  else {

    return false;
  }
}


function changeUserPayCommision(event) {

  event.preventDefault();

  if($('#updateUserC').is(":visible")){
    }else{
      $('#updateUserC').toggle();
  }

  if($('#updateUserW').is(":visible")){
      $('#updateUserW').toggle();
  }

  if($('#updateUserS').is(":visible")){
      $('#updateUserS').toggle();
  }
  
  var email = $(this).attr('rel');

  $.getJSON( '/users/userlist', function( data ) {

          $.each(data, function(){

                    if(this.email == email){
                        $('#updateCommisionC').val(this.commisionrate);
                        $('#updateAnnualRateC').val(this.annualrate);
                        $('#updateTargetHoursC').val(this.targethours);
                        $('#updateUserC').attr('rel',email);
                        return false;
                    }
          });
        });
};


function updateUserPayS(event){

  event.preventDefault();

    var confirmation = confirm('Are you sure you want to update this user?');

    if (confirmation === true) {

    var _id = $(this).parentsUntil('div').parent().attr('rel');
    window.alert(_id);

    var fieldsToBeUpdated = $('#updateUserS input.updated');
      
    var updatedFields = {};
    $(fieldsToBeUpdated).each(function(){
        var key = $(this).attr('placeholder').replace(" ","").toLowerCase();
        var value = $(this).val();
        updatedFields[key]=value;
    })

    updatedFields['weeklyrate'] = 0;
    updatedFields['commisionrate'] = 0;
    updatedFields['paytype'] = 'S';

    $.ajax({
      type: 'PUT',
      url: '/users/updateuserpayS/' + _id,
      data: updatedFields
    }).done(function( response ) {
      if (response.msg === '') {
        alert('Updated to Salary');
      }
      else {
        alert('Error: ' + response.msg);
      }
      populateUserPayTable();
      $('#updateUserS').toggle();
    });
  }
  else {

    return false;
  }
}


function changeUserPaySalary(event) {

  event.preventDefault();

  if($('#updateUserS').is(":visible")){
    }else{
      $('#updateUserS').toggle();
  }

  if($('#updateUserC').is(":visible")){
      $('#updateUserC').toggle();
  }

  if($('#updateUserW').is(":visible")){
      $('#updateUserW').toggle();
  }
  
  var email = $(this).attr('rel');

  $.getJSON( '/users/userlist', function( data ) {

          $.each(data, function(){

                    if(this.email == email){
                        $('#updateAnnualRateS').val(this.annualrate);
                        $('#updateTargetHoursS').val(this.targethours);
                        $('#updateUserS').attr('rel',email);
                        return false;
                    }
          });
        });

    
};





















function calcNextFriday(){
        var currentTime = Date.now();

        var d = new Date;
        
        var lastDayOfWeek = d.setDate(d.getDate() + (5 - 1 - d.getDay() + 7) % 7 + 1);

        return lastDayOfWeek;
}


function calcLastDayOfFN(){

        var d2 = new Date;
        var startDate = 1443103200000;
        var fnTime = 1209600000;
        var currentmilli = d2.getTime();

        while(currentmilli > startDate){
            startDate += fnTime;
        }


        return startDate;


}


function calcLastDayOfMonth(){
        var currentTime = Date.now();

        var d1 = new Date;
        var lastDayOfMonth = new Date(d1.getFullYear(), d1.getMonth() + 1, 0).getTime();

        return lastDayOfMonth;
}

function calcDate(){
        var currentTime = Date.now();

        var d = new Date;
        var currentDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

        return currentDate;
}









function postTimeCard(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#postTimeCard input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {

        

        var dupCheck = 0;
        var currentDate = calcDate();
        var lastDayOfWeek = calcNextFriday();
        var lastDayOfFn = calcLastDayOfFN();
        var lastDayOfMonth = calcLastDayOfMonth();

        


        $.getJSON( '/users/oldtimecardlist', function( data ) {


            var dupCheck = 0;

          $.each(data, function(){
            if(calcDate() == this.datelogged){
                dupCheck = 1;
                return false;
            }
          });


          if(dupCheck == 0){

                var newTimeCard = {
                    'hours' : $('#postTimeCard fieldset input#inputTimeWorked').val(),
                    'datelogged' : currentDate,
                    'rejected' : 0,
                    'duedatew' : lastDayOfWeek,
                    'duedatec' : lastDayOfFn,
                    'duedates' : lastDayOfMonth
                };
                JSON.stringify(newTimeCard);


                $.ajax({
                    type: 'POST',
                    data: newTimeCard,
                    url: '/users/postTimeCard',
                    dataType: 'JSON'
                });



                window.alert($('#postTimeCard fieldset input#inputTimeWorked').val() + ' hours added');
                $('#postTimeCard fieldset input').val('');
            }else {
                window.alert('You have already submitted your time sheet today. Come back tomorrow.')
            }

        });

    } else {
        alert('Please fill in all fields');
        return false;
    }

};








function payEmployees(event) {
        event.preventDefault();


        $.getJSON( '/users/topaylist', function( data ) {

          $.each(data, function(){

                var newEndDate = 0;

                var empID = this.empID;
                var dueDate = this.duedate;
                var amount = this.amount;
                var payType = this.paytype;
                var currentDate = calcDate();

                if(payType == 'W'){
                    newEndDate = calcNextFriday();
                }else if(payType == 'C'){
                    newEndDate = calcLastDayOfFN();
                }else if(payType == 'S'){
                    newEndDate = calcLastDayOfMonth();
                }

                

                var d = new Date();
                var now = d.getTime();

                if(now > dueDate){
                    window.alert('Paid ' + empID + ' $' + amount);
                    
                    var updatedToPay = {
                        'empID' : empID,
                        'amount' : amount,
                        'duedate' : newEndDate,
                        'datepaid' : currentDate
                    };


                    JSON.stringify(updatedToPay);

                    $.ajax({
                        type: 'POST',
                        data: updatedToPay,
                        url: '/users/updateaccount',
                        datatype: 'JSON'
                    });

                    $.ajax({
                        type: 'POST',
                        data: updatedToPay,
                        url: '/users/addpaycard',
                        datatype: 'JSON'
                    });

                    $.ajax({
                        type: 'POST',
                        data: updatedToPay,
                        url: '/users/resettopay',
                        datatype: 'JSON'
                    });



                }

          });

        });



        if(new Date().getDay() == 4){
            $.getJSON( '/users/unionmembershiplist', function( data ) {

              $.each(data, function(){
                var empID = this.empID;
                var unionID = this.union;
                var amount = this.deduction;
                
                var newDeduction = {
                        'empID' : empID,
                        'amount' : amount,
                        'union' : unionID
                };

                JSON.stringify(newDeduction);

                $.ajax({
                        type: 'POST',
                        data: newDeduction,
                        url: '/users/updateCharge',
                        datatype: 'JSON'
                });
                
              });

            });
        }

};

































function acceptTimeCard(event) {

    event.preventDefault();

        var email = $(this).attr('rel');

        $.getJSON( '/users/timecardlistfull', function( data ) {

          $.each(data, function(){
            
              if(this.email == email){
                var newAmount = this.amount;
                var dueDate = this.duedate;

 

                $.ajax({
                  type: 'DELETE',
                  url: '/users/accepttimecard/' + email
                }); 


                var updatedToPay = {
                    'empID' : email,
                    'amount' : newAmount,
                    'duedate' : dueDate
                };

                JSON.stringify(updatedToPay);


                $.ajax({
                    type: 'POST',
                    data: updatedToPay,
                    url: '/users/updatetopay',
                    datatype: 'JSON'
                }); 

                

                return false;
              }
          });

          populateTimeCardTable();
        });



};







function postponeTimeCard(event) {

    event.preventDefault();

        var email = $(this).attr('rel');

        $.getJSON( '/users/timecardlist', function( data ) {

          $.each(data, function(){
            
              if(this.email == email){

                var newChange = {
                  'email' : email
                };

                JSON.stringify(newChange);

                $.ajax({
                    type: 'POST',
                    data: newChange,
                    url: '/users/postponetimecard',
                    datatype: 'JSON'
                }); 


                return false;
              }
          });

          populateTimeCardTable();
          populatePostponedTimeCardTable();
        });
};


function emailPayCard(event) {

    event.preventDefault();

        var _id = $(this).attr('rel');
        alert(_id);

        $.getJSON( '/users/paycardlist', function( data ) {

          $.each(data, function(){
            
              if(this._id == _id){
                alert('here');

                var info = {
                  'email' : this.empID,
                  'amount' : this.amount,
                  'datepaid' : this.datepaid
                };

                JSON.stringify(info);

                $.ajax({
                    type: 'POST',
                    data: info,
                    url: '/users/emailpaycard',
                    datatype: 'JSON'
                }); 


                return false;
              }
          });

          populateTimeCardTable();
          populatePostponedTimeCardTable();
        });
};













function deleteUser(event) {

    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this user?');

    if (confirmation === true) {

        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        });





            populateDeleteTable();
    }
    else {
        return false;

    }

};



































function changePassword(event) {
    event.preventDefault();

    var newCounter = 0;

    var errorCount = 0;
    $('#password input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {


        var username = $('#password fieldset input#inputLoginUsername').val().toLowerCase();
        var oldPassword = $('#password fieldset input#inputOldPassword').val();
        var newPassword = $('#password fieldset input#inputNewPassword').val();
        var newPassword2 = $('#password fieldset input#inputNewPassword2').val();

        if(newPassword != newPassword2){
            window.alert('New Passwords Do Not Match');
        }else{

            $.getJSON('/users/userlist', function(data) {


                   $.each(data, function(){
                        var currentEmail = this.email;
                        var currentPassword = this.password;

                        if(currentEmail == username && currentPassword == oldPassword){


                            var newDetails = {'password' : newPassword};
                            JSON.stringify(newDetails);


                            $.ajax({
                                type: 'POST',
                                data: newDetails,
                                url: '/users/changePassword',
                                dataType: 'JSON'
                             });

                             window.alert('Success, password changed to: ' + newPassword);
                             $('#password fieldset input').val('');
                             newCounter = 0;
                            return false;
                        } else {
                            newCounter = 1;
                        }
                    });






                    if(newCounter == 1){
                      window.alert('Incorrect Original Details');
                    }
                });
                
                          
            }

        }else {
            alert('Please fill in all fields');
            return false;
        }

};



















function postCharge(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#postCharge input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    var employee = $('#postCharge fieldset input#inputFromID').val().toLowerCase();
    var union = $('#postCharge fieldset input#inputToID').val().toLowerCase();
    var amount = $('#postCharge fieldset input#inputAmount').val();
    var newMessage = '$' + amount + ' transferred from ' + employee + ' to ' + union;
    var currentDate = calcDate();
    var currentMilli = (new Date()).getTime();
    var balance = 0;

    if(errorCount === 0) {

        $.getJSON( '/users/singleaccountinfo', function( data ) {
            $.each(data, function(){
                if(this.empID == employee){
                    balance = parseFloat(this.amount);
                }
            });


            if(balance == 0){
                window.alert('Invalid Inputs')
            }else if(balance > amount){
                var newTransaction = {
                    'empID': employee,
                    'unionID': union,
                    'amount': amount,
                    'date' : currentDate,
                    'epoch' : currentMilli
                };

                JSON.stringify(newTransaction);
                

                $.ajax({
                    type: 'POST',
                    data: newTransaction,
                    url: '/users/postCharge',
                    dataType: 'JSON'
                });

                $.ajax({
                    type: 'POST',
                    data: newTransaction,
                    url: '/users/updateCharge',
                    dataType: 'JSON'
                });

                $.ajax({
                    type: 'POST',
                    data: newTransaction,
                    url: '/users/emailcharge',
                    dataType: 'JSON'
                });

                $('#postCharge fieldset input').val('');
                window.alert(newMessage)
            }else if(amount > balance){
                window.alert('Insufficient funds');
            }
        });
        
        

        

    } else {
        alert('Please fill in all fields');
        return false;
    }
};








function postReceipt(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#postReceipt input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    var amount = $('#postReceipt fieldset input#inputAmount').val();

    if(errorCount === 0) {

        var newReceipt = {
            'description': $('#postReceipt fieldset input#inputDescription').val(),
            'amount': amount
        }

        JSON.stringify(newReceipt);


        $.ajax({
            type: 'POST',
            data: newReceipt,
            url: '/users/postReceipt',
            dataType: 'JSON'
        });




        $.ajax({
            type: 'POST',
            data: newReceipt,
            url: '/users/updatetopay2',
            datatype: 'JSON'
        }); 




        $('#postReceipt fieldset input').val('');
        window.alert('Receipt posted for $' + amount);

    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};



function resetPassword(event){

  event.preventDefault();

  var errorCount = 0;
    $('#resetPassword input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    

    if(errorCount === 0) {

        var email = $('#resetPassword fieldset input#inputEmail').val();
        var newPassword = createNewPassword();
        window.alert(newPassword);

        $.getJSON('/users/userlist', function(data) {

                   $.each(data, function(){
                        var currentEmail = this.email;

                        if(currentEmail == email){

                            var newPwData = {
                                'email' : email,
                                'password' : newPassword
                            }

                            JSON.stringify(newPwData);


                            $.ajax({
                                type: 'POST',
                                data: newPwData,
                                url: '/users/emailpassword',
                                datatype: 'JSON'
                            });

                            $.ajax({
                                type: 'POST',
                                data: newPwData,
                                url: '/users/changePassword',
                                datatype: 'JSON'
                            });

                             window.alert('New password sent to ' + email);
                             $('#resetPassword fieldset input').val('');
                             newCounter = 0;
                             return false;
                        } else {
                            newCounter = 1;
                        }
                    });

                    if(newCounter == 1){
                      window.alert('Incorrect Email Address');
                    }
                });

        

    }else {
        alert('Please fill in all fields');
        return false;
    }

}










function login(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#login input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    

    if(errorCount === 0) {

        var email = $('#login fieldset input#inputLoginUsername').val();
        var password = $('#login fieldset input#inputLoginPassword').val();



        $.getJSON('/users/loginlist', function(data) {


                   $.each(data, function(){
                        var currentEmail = this.email;
                        var currentPassword = this.password;
                        var currentPayType = this.paytype;
                        var weeklyRate = this.weeklyrate;
                        var annualRate = this.annualrate;
                        var commisionRate = this.commisionrate;
                        var targetHours= this.targethours;


                        if(currentEmail == email && currentPassword == password){


                            var newLogin = {'email' : email, 'paytype' : currentPayType, 'weeklypay' : weeklyRate, 'yearlypay' : annualRate, 'commision' : commisionRate, 'targethours' : targetHours};
                            JSON.stringify(newLogin);


                            $.ajax({
                                type: 'POST',
                                data: newLogin,
                                url: 'users/login',
                                dataType: 'JSON'
                            });


                             window.alert('Welcome, ' + email);
                             $('#login fieldset input').val('');
                             window.location.href = '/';


                             newCounter = 0;
                             return false;
                        } else {
                            newCounter = 1;
                        }
                    });

                    if(newCounter == 1){
                      window.alert('Incorrect Login Details');
                    }
                });

    }else {
        alert('Please fill in all fields');
        return false;
    }
};



function test(event) {
    event.preventDefault();


    


            //var newLogin = {'email' : 'test2'};
           // JSON.stringify(newLogin);


                            //$.ajax({
                            //    type: 'POST',
                            //    data: newLogin,
                             //   url: 'users/admin2',
                             //   dataType: 'JSON'
                            //});


            $.getJSON('/users/loginlist', function(data) {

                $.each(data, function(){




                });
            });



};







