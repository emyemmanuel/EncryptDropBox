
var empObj = new Object();
var masterobj = new Object();
var flgPDService = "F";

var MasterListArray = new Array();
var FamilyMemberListArray = new Array();
var PersonalArray = new Array();
var master = new Array();
var masterCountry = new Array();
var masterCountryCode = new Array();
var finalHomedata;
var searchkeyvalue = "";

var EditDesgResult = new Array();
var airlinesMasterData = new Array();
var projectAssgnDetailGlobal = new Array();
var primaryBUGlobal = new Array();
var onsiteGlobal = new Array();

var PANEdit = "";
var PAN = new Array();
var NewPANArray = new Array();
var newPAN = "";
var sessionExpired = "SessionExpired";

//var SpouseEmployeeNoChck = "";
var ChildCnt = "0";

var AddressIndex = "";

var PANNationalityIndian = 0;

//variables added for PF
var flgAdditional = "N";
var flgSpouse = "N";
var fatherChk = "";//flag used to auto populate and redirection
var motherChk = "";//flag used to auto populate and redirection
var spouseChk = "";//flag used to auto populate and redirection
var PFNominationChk = "N";
var locationChk = "";
var nmRel = "";
var nmName = "";
var nmDOB = "";
var nmShare = "";
var fatherName = "";
var motherName = "";
var spouseName = "";
var fatherDOB = "";
var motherDOB = "";
var spouseDOB = "";

var FCntr = 0;
var flgRdirect = "";

var Spouse = "";
var Mother = "";
var Father = "";

var flgSpousePass = "";
var flgChildPass = "";

var flgWorkCountry = "";
var flgNationality = "";
var flgeditEnable = 0;

var flgBnkTab = "";
var flgBnkEdit = "";
var flgBnkCntS = "";
var flgBnkCntE = "";
var flgBnkBlkMsg = "";
var flgBnkBlk = "";
var flgBnkPrevCoun = "";
var flgBnkPrevCounName = "";

var flgWRegion = "";

var flgCountry = "";

//Asean Benefit Implementation
var strBenflg = "";
var TurBenFlg = "";
var MalaBenFlg = "";
var SingBenFlg = "";
var PhilBenFlg = "";

var TrID = "";
var TrDoc = "";
var flgAdd = "0";


var chdflg = 0;
var dpndflg = 0;
var emraddrssflg = 0;
var AlertMsg = "";
var flgH1BVisa = "F";
var ReloadMyWpro = 0;
//-----Main Program Strats Here-------------------//

$(document).ready(function () {
    
    $(".myDATALnk").click(function () {
        showBusyInd();
        $.ajax({
            type: "POST",
            url: ServURL + "ClearSession",
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                  hideBusyInd();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideBusyInd();
            }
        });
    });

    $('.myDATALnk').attr("href", document.referrer);// "index.html");
var myTestWurl=document.referrer.split("?")[0];
    $('#mwbackId').attr('href', myTestWurl);

    window.setTimeout(DataLoadFunction(), 100);

    //DataLoadFunction();
    $('body').on('click', '.sm_aapB', function () {
        $('.aap_content').show();
        BindDataAAP();
        var height_main = $(".middle_main").height();
	    
        if (height_main > 700) {
            var height_main = $(".middle_main").height();
            $('.sub_sidebarmenu').css('height', height_main);
            $('.main_rgt').css('height', height_main);
        }
        else {
            $('.sub_sidebarmenu').css('height', '654px');
            $('.main_rgt').css('height', '654px');

        }
	  
	   
    });

    $(function () {
        var controls = $(".offBnTB");
        controls.bind("paste", function () {
            return false;
        });
        controls.bind("drop", function () {
            return false;
        });
        controls.bind("cut", function () {
            return false;
        });
        controls.bind("copy", function () {
            return false;
        });
    });

    $(".theFileInputEdu").on("change", AssingFileName);
    function AssingFileName() {
        if ($(".theFileInputEdu").length > 0) {
            fileData = $(".theFileInputEdu")[0].files[0];
            if (fileData != undefined) {
                $('#eduBrowseVal').val(fileData.name);
            }
        }
    }
    
    $(".ReChkUSBank").hide();

    $("#txtBDAcctNumber").keypress(function (key) {
       
       if(!(key.charCode>=48 && key.charCode<=57))
            return false;
    });

    $("#txtBDReAcctNumber").keypress(function (key) {
        if (!(key.charCode >= 48 && key.charCode <= 57)) return false;
    });

    $("#txtBDERAAccNo").keypress(function (key) {
        if (!(key.charCode >= 48 && key.charCode <= 57)) return false;
    });

    $("#txtBDERAReAccNo").keypress(function (key) {
        if (!(key.charCode >= 48 && key.charCode <= 57)) return false;
    });

    $("#app_Submit").on('click', function () {     
        fncAppSubmit();
    });
    //-----For Binding Address details section----//
    $("#divAddrss").on('click', function () {
        $.getScript("js/Address.js", function () {
            AjaxAddress();
        });
    });

    //-----For Binding Bank details section----//
    //  $('#sm_bank').click(function (event) {
    $('.sm_bank_B').click(function (event) {
        $("#noteMsgB").hide();
        $.getScript("js/OffBnk.js", function () {
            onClickBnk();
        });
    });

    //PSP Click

    $(".sm_psp_P").click(function (event) {
        $('.aap_content').hide();
        var href = $('.PSP_link').attr('href');
        window.location.href = href;
     
    });

    //-----For Binding Family details section----//
    $('.personal_family_add').click(function () {
        $.getScript("js/Familydetails.js", function () {
            familydetails(1);
        });
    });

    //-----For Binding Education details section----//
    //$("#sm_education").on('click', function () {
    $(".sm_education_E").on('click', function () {
        $.getScript("js/Education.js", function () {
            EducClick();
        });
    });

    $("#btnEduSbmt").on('click', function () {
        SubmitEducation();
    });
    //-----For Binding Official details section----//
    //$("#sm_official").on('click', function () {
    $(".sm_official_O").on('click', function () {
        $.getScript("js/OfficialDtls.js", function () {
            OffiClick();
        });
    });

    //-----For Binding Assignment details section----//
    //$('#sm_assignment').click(function () {
    $('.sm_assignment_B').click(function () {
        $.getScript("js/AssignmntDtls.js", function () {
            AssignClick();
        });
    });

    //-----For Binding Travel details section----//
    // $('#travel_img').click(function () {
    $('.travel_img_T').click(function () {

        $.getScript("js/Travel.js", function () {
            onClickTravel();
        });
    });

    //-----For Office details section----//
    $('.sm_office_O').click(function () {
        hopscotch.endTour(true);

    });


    //-----For Binding Resume Details section----//
    $(".sm_resume_R").on('click', function () {
        hopscotch.endTour(true);
        showBusyInd();
        AjaxResume();

    });

    var strURL = document.URL;

    $("#dvVisa").css("display", "none");

  

    $(window).load(function () {
        if (sessionStorage.getItem("1")) {
            showBusyInd();
            $("#personal_img").trigger("click");
            sessionStorage.removeItem("1");
            window.setTimeout(function () {
                hideBusyInd();
            }, 2000);
            fncAlert("Photo uploaded successfully.");
        }

    });


    //Offshore Salary Banks on change event
    $('#drpBDBankName').change(function () {
        $("#txtBDIFSC").val("");
        $("#txtBDAcctNumber").val("");
        $("#txtBDReAcctNumber").val("");
        $("#txtBDCity").val("");
        $("#txtBDBankCode").val($('#drpBDBankName').val());

    });

    //Offshore ERA Banks on change event
    $('#drpBDERABankName').change(function () {
        $("#txtBDERAIFSC").val("");
        $("#txtBDERAAccNo").val("");
        $("#txtBDERAReAccNo").val("");
        $("#txtBDERACity").val("");
        $("#txtBDERABankCode").val($('#drpBDERABankName').val());
    });

    //Onsite Salary Banks on change event
    $('#ddlOnsiteStateList').change(function () {
        $("#txtOnsiteCity").val("");
        $("#txtOnsitePostalCode").val("");
        $("#txtOnsiteAddress1").val("");
        $("#txtOnsiteAddress2").val("");
    });

    //Onsite ERA Banks on change event
    $('#ddlOnsteReimState').change(function () {
        $("#txtOnsteReimCity").val("");
        $("#txtReimOnstePostalCode").val("");
        $("#txtOnsteReimAddress1").val("");
        $("#txtOnsteReimAddress2").val("");
    });

    HideBnkTab_EditOpt();

    //-----For Binding Personal Details section----//
    $("#dvPersonal").on('click', function () {
        hopscotch.endTour(true);
        onClickPersonalDtls(0);
    });

    //$("#personal_img").on('click', function () {
    $(".personal_img_P").on('click', function () {
        hopscotch.endTour(true);
        onClickPersonalDtls(0);
        if (strBenflg != "") {
            $(".personal_list").css("width", "24.5%");
            $("#divAddrss").removeClass("margin_zero");
            $("#divOthers").addClass("margin_zero");
            $("#divOthers").css("display", "block");
        }
        else {

            $("#divOthers").css("display", "none");
        }
    });

    //add function for child in personal details starts here//
    $("body").on("click", ".add_child", function (e) {
        addChild(this);
    });
    $("body").on("click", ".delete_vehicle", function () {
        deletChild(this);
    });
    //add function for child in personal details ends here//

    //add function for dependency details  starts here//
    $("body").on("click", ".add_additional", function (e) {
        AdditionalFamilyDtlAdd(this);
    });

    $("body").on("click", ".delete_vehicle", function () {
        deletdependency(this);
    });
    //add function for child in dependency details ends here//

    //add function for emergency contact address  details starts here//
    $("body").on("click", "#spnPDEmrAdEdit2", function (e) {
        EmerAddrEdit();
    });
    $("body").on("click", "#spndlteEmrAdd", function () {
        EmerAddrAdd(this);
    });
    //add function for emergency contact address  details Ends here//

    //add Child Passport
    $("body").on("click", ".add_vp", function (e) {
        addChildPass(this);
    });

    //delete child Passport
    $("body").on("click", ".delChildPass", function () {
        deleteChildPass(this);
    });

    //My Info Submit
    $("#btnPDsbmt").click(function () {

        showBusyInd();
        var isError = validateMyInfoDetails().isError;
        var errorMsg = validateMyInfoDetails().errorMsg;
        if ($("#txtPDnatl").css('display') == "none") {
            $('#IsEditMyInfo').val('0');
        } else {
            $('#IsEditMyInfo').val('1');
        }
        if ($('#IsEditMyInfo').val() == 1) {
            if (isError == true) {
                hideBusyInd();
                fncValidateMsg(errorMsg);

            }
            else {
                var varNMTDYN = "", strnomflg = 0, flagUpdate = 0, fflagReset = 0;
                if (strnomflg == 0) {
                    var res = $("#txtPDnatl").val().split("-");
                    var Nationality = res[0];
                    var BloodGrp = $("#ddlPDbldg").val();
                    var PlaceOfBrth = $("#txtPDpob").val();
                    var MothrTngue = $("#txtPDlng").val();
                    var MarrtlStatus = $("#ddlPDmarsts").val();
                    var Landx_Code=$("#hdnLandx_Code").val();
                    var Natio_Code=$("#hdnNatio_Code").val();
                    if (MarrtlStatus == "NM") {
                        MarrtlStatus = "NM.";
                    }
                    var Citizen1 = $("#txtPDctzn1").val();
                    if ($("#txtPDctzn2").val() == "N/A") {
                        var Citizen2 = "";
                    }
                    else {
                        var Citizen2 = $("#txtPDctzn2").val();
                    }
                    var PassPort = $("#hdnPDpasprt").val();

                    var FullNme = $("#hdnPDflnme").val();

                    var LastNme = $("#hdnPDlstnme").val();

                    var FirstNme = $("#hdnPDfrstnme").val();

                    var Gender = $("#hdnPDgndr").val();

                    var DOB = SAPdate($("#txtPDdob").val());

                    var Country = $("#hdnPDcntry").val();

                    var DOJ = $("#hdnPDdoj").val();

                    var MarDte = $("#hdnPDmdte").val();

                    var Chldrns = $("#hdnPDchld").val();

                    var Action = $("#hdnPDEmpStatus").val();

                    if (PANNationalityIndian == 1) {
                        if (PANEdit == "YES") {
                            newPAN = $("#txtPDpan").val();
                        }
                        else {
                            newPAN = "NO";
                        }
                    }
                    else {
                        newPAN = "NO";
                    }

                    var varNMNRLSP = CheckEmptyVal(nmRel);
                    var varNMNNAME =CheckEmptyVal(fatherName);
                    var varNMNDOB = CheckEmptyVal(nmDOB);
                    varNMTDYN = CheckEmptyVal(PFNominationChk);
                    var varSPSENAME = CheckEmptyVal(spouseName);
                    var varSPSEDOB = CheckEmptyVal(spouseDOB);
                    var varFTHRNAME = CheckEmptyVal(fatherName);
                    var varFTHRDOB = CheckEmptyVal(fatherDOB);
                    var varMTHRNAME = CheckEmptyVal(motherName);
                    var varMTHRDOB = CheckEmptyVal(motherDOB);
                    var varNMSHARE = CheckEmptyVal(nmShare);

                    if (fatherChk == "N") {
                        varNMNRLSP = "Father";
                        varNMNNAME = $('#txtFTFNM').val() + ' ' + $('#txtFTLNM').val();
                        varNMNDOB = SAPdateFatherDD($('#txtDOB').val());
                        varNMTDYN = "Y";
                        varNMSHARE = "100.00";
                    }
                    if (fatherChk == "l") {
                        varNMNRLSP = "Father";
                        varNMNNAME = CheckEmptyVal(fatherName);
                        varNMNDOB = fatherDOB;
                        varNMTDYN = "Y";
                        varNMSHARE = "100.00";
                    }
                    var Nominee = "Father";
                    var PrevUAN = "";
                    var PrevEPS = "";
                    var UID = "";
                    var PrevPF = "";

                    if ((flgWRegion.toUpperCase() == "OFFSHORE") || ((flgWRegion.toUpperCase() == "ONSITE") && (flgBnkPrevCoun.toUpperCase() == "IN"))) {
                        PrevUAN = replaceAMwithCP($("#txtPDprevUAN").val().toUpperCase());
                        PrevEPS = replaceAMwithCP($("#txtPDprevEPS").val().toUpperCase());
                        UID = replaceAMwithCP($("#txtPDUID").val().toUpperCase());
                        PrevPF = replaceAMwithCP($("#txtPDprevPF").val().toUpperCase());


                        if ((PrevEPS != "NA") && (PrevEPS != "NOT AVAILABLE") && (PrevEPS != "NOT APPLICABLE") && (PrevEPS != "")) {
                            if ((PrevPF == "NA") || (PrevPF == "NOT AVAILABLE") || (PrevPF == "NOT APPLICABLE") || (PrevPF == "")) {
                                flagUpdate = 1;
                            }
                        }
                        if ((PrevUAN != "NA") && (PrevUAN != "NOT AVAILABLE") && (PrevUAN != "NOT APPLICABLE") && (PrevUAN != "")) {
                            if ((PrevPF == "NA") || (PrevPF == "NOT AVAILABLE") || (PrevPF == "NOT APPLICABLE") || (PrevPF == "")) {
                                flagUpdate = 1;
                            }
                        }

                        if (varSPSENAME == "NA")
                            varSPSENAME = "";
                        if (varSPSEDOB == "NA")
                            varSPSEDOB = "";
                        if (varFTHRNAME == "NA")
                            varFTHRNAME = "";
                        if (varFTHRDOB == "NA")
                            varFTHRDOB = "";
                        if (varMTHRNAME == "NA")
                            varMTHRNAME = "";
                        if (varMTHRDOB == "NA")
                            varMTHRDOB = "";
                        if (varNMSHARE == "NA")
                            varNMSHARE = "";
                        if (varNMNRLSP == "NA")
                            varNMNRLSP = "";
                        if (varNMNNAME == "NA")
                            varNMNNAME = "";
                        if (varNMNDOB == "NA")
                            varNMNDOB = "";
                        if (varNMTDYN == "NA")
                            varNMTDYN = "";
                    }
                    else {
                        PrevUAN = "";
                        PrevEPS = "";
                        UID = "";
                        PrevPF = "";
                        varFTHRDOB = "";
                        varFTHRNAME = "";
                        varSPSENAME = "";
                        varSPSEDOB = "";
                        varMTHRNAME = "";
                        varMTHRDOB = "";
                        varNMSHARE = "";
                        varNMTDYN = "";
                        varNMNRLSP = "";
                        varNMNNAME = "";
                        varNMNDOB = "";

                    }
                    var EditedFatherData = "";

                    if ((flgWRegion.toUpperCase() == "OFFSHORE") || ((flgWRegion.toUpperCase() == "ONSITE") && (flgBnkPrevCoun.toUpperCase() == "IN"))) {

                        if (fatherChk == "N") {
                            var FatherEditArray = new Array();
                            var InfFatherFamObj = new Object();

                            InfFatherFamObj.STEXT = "FATHER";
                            InfFatherFamObj.NAME = "";
                            InfFatherFamObj.FAMSA = "11";
                            InfFatherFamObj.FASEX = "MALE";

                            InfFatherFamObj.FAVOR = $('#txtFTFNM').val();

                            InfFatherFamObj.FANAM = $('#txtFTLNM').val();

                            InfFatherFamObj.FGBDT = SAPdate($('#txtDOB').val());

                            InfFatherFamObj.NATIO = $('#txtFTNatio').val();
                            InfFatherFamObj.ZZPERNR = "";
                            InfFatherFamObj.ZZFLAG = "";
                            InfFatherFamObj.ANZKD = "";
                            InfFatherFamObj.FAMDT = "";
                            InfFatherFamObj.OBJPS = "";
                            FatherEditArray.push(InfFatherFamObj);
                            EditedFatherData = JSON.stringify(FatherEditArray);
                            fflagReset = 0;
                            fatherChk = "Y";
                        }

                        if (flagUpdate == 1) {
                            fncValidateMsg("Please update PF details");
                            hideBusyInd();
                        }
                        else {
                            var EditedData = JSON.stringify({
                                "PERNR": "EmpPD01", "ENAME": FullNme, "NACHN": LastNme, "VORNA": FirstNme, "GESCH": Gender, "GBDAT": DOB, "LAND_CODE": Landx_Code, "LANDX": Country,
                                "GBORT": PlaceOfBrth, "FTEXT": MarrtlStatus, "STEXT": BloodGrp, "ZZDTEJN": DOJ, "FAMDT": MarDte, "ANZKD": Chldrns, "ZZMOTTONG": MothrTngue, "ZZNAT1": Citizen1,
                                "ZZNAT2": Citizen2, "NATIO_CODE": Natio_Code, "NATIO": Nationality, "DOCN1": PassPort, "PREVIOUS_PF": PrevPF, "PREVIOUS_UAN": PrevUAN, "UID_NUM": UID, "EPS_NUM": PrevEPS, "ACTION": Action,
                                "NMTDYN": varNMTDYN, "NMNRLSP": varNMNRLSP, "NMNNAME": varNMNNAME, "NMNDOB": varNMNDOB, "NMNSHARE": varNMSHARE, "SPSENAME": varSPSENAME, "SPSEDOB": varSPSEDOB, "FTHRNAME": varFTHRNAME, "FTHRDOB": varFTHRDOB, "MTHRNAME": varMTHRNAME, "MTHRDOB": varMTHRDOB
                            });

                            UploadPANFile(EditedData, newPAN, EditedFatherData);
                        }
                    }
                    else {
                        var EditedData = JSON.stringify({
                            "PERNR": "EmpPD01", "ENAME": FullNme, "NACHN": LastNme, "VORNA": FirstNme, "GESCH": Gender, "GBDAT": DOB, "LAND_CODE": Landx_Code, "LANDX": Country,
                            "GBORT": PlaceOfBrth, "FTEXT": MarrtlStatus, "STEXT": BloodGrp, "ZZDTEJN": DOJ, "FAMDT": MarDte, "ANZKD": Chldrns, "ZZMOTTONG": MothrTngue, "ZZNAT1": Citizen1,
                            "ZZNAT2": Citizen2, "NATIO_CODE": Natio_Code, "NATIO": Nationality, "DOCN1": PassPort, "PREVIOUS_PF": PrevPF, "PREVIOUS_UAN": PrevUAN, "UID_NUM": UID, "EPS_NUM": PrevEPS, "ACTION": Action,
                            "NMTDYN": varNMTDYN, "NMNRLSP": varNMNRLSP, "NMNNAME": varNMNNAME, "NMNDOB": varNMNDOB, "NMNSHARE": varNMSHARE, "SPSENAME": varSPSENAME, "SPSEDOB": varSPSEDOB, "FTHRNAME": varFTHRNAME, "FTHRDOB": varFTHRDOB, "MTHRNAME": varMTHRNAME, "MTHRDOB": varMTHRDOB
                        });

                        UploadPANFile(EditedData, newPAN, EditedFatherData);
                    }
                }
            }
        }
        else {
            hideBusyInd();
            fncAlert("Please edit some data and then click on submit.");
        }
    });


    //My Info Edit click
    $('#spnPDedt').click(function () {
        $('input[name=Nominee]').attr("disabled", false);
        var IsEditMyInfo = $('#IsEditMyInfo').val();

        if (IsEditMyInfo == '0') {

            $('#IsEditMyInfo').val('1');
        }
        else if (IsEditMyInfo == '1') {
            $('#IsEditMyInfo').val('0');
        }

    });

    //add child Click family
    $('.add_child').click(function () {
        var AddChld = $('#IsAddChld').val();
        if (AddChld == '0') {

            $('#IsAddChld').val('1');
        }
    });

    //add additional family Click
    $('.add_additional').click(function () {
        var AddAdditional = $('#IsAddAddtnl').val();
        if (AddAdditional == '0') {
            $('#IsAddAddtnl').val('1');
        }
    });

    //Family Details Submit
    $("#btnPDfdsbmt").click(function () {
        SubmitFamilyDtls();
    });

    //Emergency Address Edit Click when data already exist
    $('#spnPDEmrAdEdit').click(function () {
        EmerAddrsSubmit();
    });

    //Address Details Submit
    $("#btnPDadsbmt").click(function () {
        SubmitAddrDetails();
    });

    //Communication Address state on change event
    $('#ddlPDTstate').change(function () {
        var selectdState = $('#ddlPDTstate').find('option:selected').val();
        AjaxCity(selectdState, "T");
    });

    //Permanent Address State on change event
    $('#ddlPDPstate').change(function () {
        var selectdState = $('#ddlPDPstate').find('option:selected').val();
        AjaxCity(selectdState, "P");
    });

    //Host Communication Address state on change event
    $('#ddlHostTstate').change(function () {
        var selectdState = $('#ddlHostTstate').find('option:selected').val();
        AjaxCity(selectdState, "OT");
    });

    //Host Permanent Address State on change event
    $('#ddlHostPstate').change(function () {
        var selectdState = $('#ddlHostPstate').find('option:selected').val();
        AjaxCity(selectdState, "OP");
    });

    $('#upload').click(function () {
        PanImageCall();
    });

    $("#fileUpload").on("change", OnGetFile);

    function OnGetFile(e) {
        e.stopPropagation();
        e.preventDefault();
        var file = null;
        if ($("#fileUpload")[0].files) {// file upload
            file = $("#fileUpload")[0].files[0] || null;
        }
        if (!file) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(file, "UTF-8");
        reader.onload = function (e) {
            //$("#filename").html("Result: '" + file.name + "' (" + e.target.result.length + " B)");
            $("#result").val(e.target.result);
            var dataURL = e.target.result;
            // var returnUrl = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

            //   var imag = "<img "
            //+ "src='" + "data:image/png;base64,"
            //+ base64Data + "'/>";
            $("#divImageHolder").append('<img '
                + 'src="' + dataURL + '"/>');
        };
        reader.onerror = function (e) {
            $("#result").val(e.target.error);
        };
    }
  
    $('#btnTPSubmit').click(function () {
        showBusyInd();
        SubmitTravelProfile();
    });

    //Function to editTravelPreference
    $('#editBtnTravelPrefrence').click(function () {
        editTravelPref();
    });

    //Function to edit Passport Details
    $('#editBtnPassportDetails').click(function () {
        editPassDetails();
    });

    //--------Salary bank acount Edit--------//
    $('#editBtnBDSalary').click(function () {
        if ($("#txtBDAcctNumber").is(':visible') == true) {
            $("#liSalRenter").show();
        }
        SalaryEdit();
    });

    //--------Reimburse bank accnt Edit--------//
    $('#editBtnBDERA').click(function () {
        if ($("#txtBDERAAccNo").is(':visible') == true) {
            $("#liERArenter").show();
        }
        ReimburseEdit();
    });

    //-------Host Salary Account Edit-----//
    $('#divEdtHstSlry').click(function () {
        if ($('#txtOnsiteBankName').is(":visible") == true) {
            $('.Salry_act').show();
        }
        else
            $('.Salry_act').hide();
    });
    //-------Host Reimburse Account Edit-----//
    $('#divEdtHstreimburse').click(function () {
        if ($('#txtOnsteReimBankName').is(":visible") == true) {
            $('.Salry_act').show();
        }
        else
            $('.Salry_act').hide();
    });

    //--Offshore Buttn purpose
    $('#divEdtsalary').click(function () {
        if ($('#txtBDName').is(":visible") == true) {
            $('.Salry_act').show();
        }
        else
            $('.Salry_act').hide();
    });
    $('#divEdtreimburse').click(function () {
        if ($('#txtBDERAName').is(":visible") == true) {
            $('.Salry_act').show();
        }
        else
            $('.Salry_act').hide();

    });
    //--Offshore Buttn purpose
    //Add Airline Prefrence
    $("body").on("click", ".add_gate", function (e) {
        var div_box_travel = CreateAirlineDropDown();
        $('.guest_pass_create').append(div_box_travel);
        $(this).hide();
    });

    //Delete Airline Prefrence
    $("body").on("click", ".delete_gate", function () {
        if ($(this).parents(".down_cont_gp").is(":last-child") == 1) {
            $(this).parents(".down_cont_gp").prev().find(".add_gate").show();
            $(this).parents(".down_cont_gp").remove();
        }
        else {
            $(this).parents(".down_cont_gp").remove();
        }
    });

    $('.passort_head').click(function () {
        $(this).toggleClass('active');
        $(this).parents().siblings().children('.passort_head').removeClass('active');
        $(this).siblings('.passort_content').slideToggle();
        $(this).parents().siblings().children('.passort_content').slideUp();
    });

    $('.no_btn2').click(function () {
        
        $("html, body").css("overflow", "auto");
        $('.non_edit_off,.non_edit_poff,.salry_nonedit,.passport_nonedit,.non_edit_off_child,.non_edit_off_additional').show();
        $('.edit_off_field,.edit_off_pfield,.office_txt_salry,.passport_edit,.edit_off_field_child,.edit_off_field_additional').hide();
        $('.popup_main2').fadeOut();
        $('.popup_main').fadeOut();
        $('.over_ley').fadeOut();
        var reDirect = ["error", "Session", "Bad request", "404", "400"];
        var msg = $('#divalrt2').html();
        for (var i = 0; i <= 4; i++) {
            if (msg.indexOf(reDirect[i]) > -1) {
                var href = HomeURL;
                window.location.href = href;
            }
        }


        if ($('#divalrt2').html().indexOf("activation code is incorrect") > -1) {
            $("#txtActivationCode").val("");
            $("#txtReimActivatnCode").val("");
        }
        if ($('#divalrt2').html().indexOf("Account Number cannot be same") > -1) {
            var i = 0;
            if (i == 0) {
                i = 1;
                if ($("#txtBDERAAccNo").is(":visible") == true) {
                    $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
                    $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
                    $("#liERArenter").css("display", "none");
                }
                else {
                    $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.office_txt_salry').show();
                    $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.salry_nonedit').hide();
                    $("#liERArenter").css("display", "list-item");

                }
            }
            if (i == 0) {
                i = 1;
                if ($("#txtBDAcctNumber").is(":visible") == true) {
                    $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
                    $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
                    $("#liSalRenter").css("display", "none");

                } else {
                    $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.office_txt_salry').show();
                    $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.salry_nonedit').hide();
                    $("#liSalRenter").css("display", "list-item");

                }
            }
            i = 0;
        }
    });

    $('#btnPopupOK').click(function () {
        $("html, body").css("overflow", "auto");
        $('.over_ley').fadeOut();
        $('.popup_main2').fadeOut();
        if ($('#divalrt2').html().indexOf("VALID IFSC CODE") > -1 || $('#divalrt2').html().indexOf("length is not matching") > -1) {
            var i = 0;
            if (i == 0) {
                if ($("#txtBDERAAccNo").is(":visible") == true) {
                i = 1;
                    $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
                    $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
                    $("#liERArenter").css("display", "none");
                }
                else {
                i = 1;
                    $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.office_txt_salry').show();
                    $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.salry_nonedit').hide();
                    $("#liERArenter").css("display", "list-item");

                }
            }
            if (i == 0) {
                if ($("#txtBDAcctNumber").is(":visible") == true) {
                 i = 1;
                    $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
                    $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
                    $("#liSalRenter").css("display", "none");

                } else {
                 i = 1;
                    $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.office_txt_salry').show();
                    $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.salry_nonedit').hide();
                    $("#liSalRenter").css("display", "list-item");

                }
            }
            i = 0;
        }
    });

    //------submit bank details click-----------//
    $('.Salry_act').click(function () {
        showBusyInd();
        SubmitBankDetails();
        //ResetBnkHiddnFlds();
    });

    //---------------------Submit Activation Code click---------//
    $('.Activation_btn').click(function () {
        ActivationBtnclick();
    });

    //----- filter for Asssignments details----------//
    $('#btnADSearch').click(function () {
        showBusyInd();
        FilterAssignmentsDetails();
        hideBusyInd();
    });

    $('.noteForEdu').click(function () {
        $('.noteGiven').toggle(); // it's already showing, right?
    });

    //----------------------Reject Activation Code click---------//
    $('.Activation_rjctbtn').click(function () {
        ActivtaionReject();
    });

    AddressCalling(strURL);


});

/*************************** Bank Related starts***********************************/

function HideBnkTab_EditOpt() {
    //$("#sm_bank").hide();

    if (flgBnkTab.toUpperCase() == "Y") {
      //if (flgWRegion.toUpperCase() == "OFFSHORE")
          $("#sm_bank").show();
      //if ((flgWRegion.toUpperCase() == "ONSITE" || flgWRegion.toUpperCase() == "ODR") && flgCountry=="USA")
      //  $("#sm_bank").show();
    }
    else
        $("#sm_bank").hide();

    $("#divEdtsalary").hide();
    $("#divEdtreimburse").hide();
    $("#divEdtHstSlry").hide();
    $("#divEdtHstreimburse").hide();
    $("#divEdtODRSlry").hide();
    $("#divEdtODRreimburse").hide();
    $("#editBtnBDPayroll").show();
    $("#dvEditUSAReim").show();


    if (flgBnkEdit.toUpperCase() == "Y") {
        $("#divEdtsalary").show();
        $("#divEdtreimburse").show();
        $("#divEdtHstSlry").show();
        $("#divEdtHstreimburse").show();
        $("#divEdtODRSlry").show();
        $("#divEdtODRreimburse").show(); 
    }
    else {
        $("#divEdtsalary").hide();
        $("#divEdtreimburse").hide();
        $("#divEdtHstSlry").hide();
        $("#divEdtHstreimburse").hide();
        $("#divEdtODRSlry").hide();
        $("#divEdtODRreimburse").hide();
    }
}

function onClickBnk() {
   
    hopscotch.endTour(true);
    EditToggle()
        showBusyInd();
        $('.Activation_rjctbtn').hide();
        $('.Activation_btn').hide();
        $('.bank_account_main').show();
        $('.add_slry_act').hide();
        $('.add_reimbrse_act').hide();

    if (flgWRegion.toUpperCase() != "OFFSHORE") {
        $(".bnkSwitch").show();
        if (flgBnkPrevCoun.toUpperCase() != "IN")
            $(".remb-img").hide();
    }
    else
        $(".remb-img").show();
    //ResetBnkHiddnFlds();
    checqueImage();
    LoadBankDetails();


}

function EditToggle() {
    if ($('#txtBDERAName').is(':visible') == true) {
        $('.Salry_act').hide();
        $('#divEdtsalary').show();
        $('#divEdtHstreimburse').show();
        $('#divEdtHstSlry').show();
        $('#liERArenter').show();
        $('#divEdtPayrol').show();
        $('#dvUSBankedit').show();
        $('#dvEditUSAReim').show();
        $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
        $("#editBtnBDERA").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
    }

    if ($('#txtBDName').is(':visible') == true) {
        $('.Salry_act').hide();
        $('#divEdtreimburse').show();
        $('#divEdtHstreimburse').show();
        $('#divEdtHstSlry').show();
        $('#liSalRenter').show();
        $('#divEdtPayrol').show();
        $('#dvUSBankedit').show();
        $('#dvEditUSAReim').show();
        $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
        $("#editBtnBDSalary").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
    }

    //Onsite starts
    if ($('#txtOnsiteBankName').is(':visible') == true) {
        $('.Salry_act').hide();
        $('#divEdtHstreimburse').show();
        $('#divEdtsalary').show();
        $('#divEdtreimburse').show();
        $('#divEdtPayrol').show();
        $('#dvUSBankedit').show();
        $('#dvEditUSAReim').show();
        $('#divEdtODRSlry').show();
        $('#divEdtODRreimburse').show();
        $("#editBtnBDHostS").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
        $("#editBtnBDHostS").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
    }

    if ($('#txtOnsteReimBankName').is(':visible') == true) {
        $('.Salry_act').hide();
        $('#divEdtHstSlry').show();
        $('#divEdtsalary').show();
        $('#divEdtreimburse').show();
        $('#divEdtPayrol').show();
        $('#dvUSBankedit').show();
        $('#dvEditUSAReim').show();
        $('#divEdtODRSlry').show();
        $('#divEdtODRreimburse').show();
        $("#editBtnBDHostRBurse").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
        $("#editBtnBDHostRBurse").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
    }

    //ODR Starts

    if ($('#txtODRCustName').is(':visible') == true) {
        $('.Salry_act').hide();
        $('#divEdtHstreimburse').show();
        $('#divEdtsalary').show();
        $('#divEdtreimburse').show();
        $('#divEdtPayrol').show();
        $('#dvUSBankedit').show();
        $('#dvEditUSAReim').show();
        $('#divEdtODRreimburse').show();
        $("#editBtnBDHostS").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
        $("#editBtnBDHostS").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
    }

    if ($('#txtODRReimCustName').is(':visible') == true) {

        $('.Salry_act').hide();
        $('#divEdtHstSlry').show();
        $('#divEdtsalary').show();
        $('#divEdtreimburse').show();
        $('#divEdtPayrol').show();
        $('#dvUSBankedit').show();
        $('#dvEditUSAReim').show();
        $('#divEdtODRSlry').show();
        $("#editBtnBDHostRBurse").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
        $("#editBtnBDHostRBurse").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
    }
    //Payroll section
    if ($('.payroll').is(':visible') == true) {
        $('.Salry_act').hide();
        $('#divEdtHstSlry').show();
        $('#divEdtsalary').show();
        $('#divEdtreimburse').show();
        $('#divEdtHstreimburse').show();
        $('#dvUSBankedit').show(); 
        $('#dvEditUSAReim').show();
        $('#divEdtODRSlry').show();
        $('#divEdtODRreimburse').show();
        $("#editBtnBDPayroll").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
        $("#editBtnBDPayroll").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
    }

    if ($('#txtRoutNoCHK1').is(':visible') == true || $('#txtRoutNoCHK2').is(':visible') == true || $('#txtRoutNoSAV').is(':visible') == true || $('#txtWireRout').is(':visible') == true) {
        if ($('#dvchkAcc1').css('display') == 'none') {
            $('.chkAcc1').trigger("click");
        }

        $(".ReChkUSBank").hide();
        $('.Salry_act').hide();
        $('#dvEditUSAReim').show();
        $('#divEdtreimburse').show();
        $('#divEdtODRSlry').show();
        $('#divEdtODRreimburse').show();
        $('#divEdtsalary').show();
        $('#divEdtHstreimburse').show();
        $('#liERArenter').show();
        $('#divEdtPayrol').show();
        $(".USBank_edit").parents('.inner_head').siblings().children().children().children().children('.passport_nonedit').show();
        $(".USBank_edit").parents('.inner_head').siblings().children().children().children().children('.passport_edit').hide();
    }
    if ($('#txtUSReimCustName').is(':visible') == true) {
        $('#divEdtPayrol').show();
        $('#dvUSBankedit').show();
        $('#divEdtsalary').show();
        $('#divEdtreimburse').show();
        $('#liERArenter').show();
        $("#editBtnUSReim").parents('.inner_head').siblings().children().children().children('.office_txt_salry').hide();
        $("#editBtnUSReim").parents('.inner_head').siblings().children().children().children('.salry_nonedit').show();
    }
   
   
}

/*************************** Bank Related Ends ***********************************/

//For Redirection from myOpportunities and Office

function AddressCalling(strURL) {
    if (strURL.indexOf("?") != "-1") {
        if (strURL.toUpperCase().indexOf("ADD") != "-1") {
            $("#personal_img").trigger("click");
            $("#divAddrss").trigger("click");
        }
        else if (strURL.toUpperCase().indexOf("BANK") != "-1") {
            $(".sm_bank_B").trigger("click");
        }
        else if (strURL.toUpperCase().indexOf("OPP") != "-1") {
            $(function () {
                $('#sm_office').click(function () {
                    // 'this' is not a jQuery object, so it will use
                    // the default click() function
                    this.click();
                }).click();
            });
            //$("#sm_office")[0].click();

        }
    }
}

/******************************Personal Details Section Starts ***************************/

function onClickPersonalDtls(n) {
    
        $('.father_sec').slideUp();       
            showBusyInd();
            PersonalArray = new Array();
        $.ajax({
            type: "POST",
            url: ServURL + "GetPersonalDtls",
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                PersonalArray = new Array();
                if (data.GetPersonalDtlsResult.strRetmg == sessionExpired) {
                    hideBusyInd();
                    fncAlert("Session expired please login again");
                } else {
                    PersonalDetails(data);
                    if (n == 0)
                        AjaxPAN();
                    hideBusyInd();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (n == 0)
                    fncAlert("An error occured while fetching personal details");
                else
                    fncAlert("An error occured while updating personal details");
                hideBusyInd();
            }
        });
    }

    function AjaxPAN() {

        //Ajax Call For Getting PAN Card details
        PAN = new Array();
        $.ajax({
            type: "POST",
            url: ServURL + "GetPANDetails",
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            statusCode: {

                200: function (data) {
                    //alert(JSON.stringify(data));
                    PANDetails(data);
                    hideBusyInd();
                },
                400: function (data) {
                    fncAlert("Bad request.");
                    hideBusyInd();
                },
                404: function (data) {
                    fncAlert("404 error.");
                    hideBusyInd();
                },
                405: function (data) {
                    fncAlert("405 error.");
                    hideBusyInd();
                }
            }
        });
    }

function AjaxEditMyINFO(EmpNO, FullNme, LastNme, FirstNme, Gender, DOB, Country, DOJ, MarDte, Chldrns, Nationality, BloodGrp, PlaceOfBrth, MothrTngue, MarrtlStatus, Citizen1, Citizen2, PassPort, newPAN) {

    var EditedData = JSON.stringify({
        "PERNR": "EmpPD01", "ENAME": FullNme, "NACHN": LastNme, "VORNA": FirstNme, "GESCH": Gender, "GBDAT": DOB, "LANDX": Country,
        "GBORT": PlaceOfBrth, "FTEXT": MarrtlStatus, "STEXT": BloodGrp, "ZZDTEJN": DOJ, "FAMDT": MarDte, "ANZKD": Chldrns, "ZZMOTTONG": MothrTngue, "ZZNAT1": Citizen1,
        "ZZNAT2": Citizen2, "NATIO": Nationality, "DOCN1": PassPort
    });

        $.ajax({
            type: "POST",
            url: ServURL + "EditPersonalDetails",
            async: false,
            data: JSON.stringify({ "EditedData": EditedData, "newPAN": newPAN }),
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                var PANresult = JSON.parse(JSON.parse(data.EditPersonalDetailsResult)["PAN"]);
                if (JSON.parse(data.EditPersonalDetailsResult)["MyInfo"] == "S" && PANresult["panStatus"] != "Failed") {

                    hideBusyInd();
                    fncAlert("Data submitted successfully.");
                    onClickPersonalDtls(1);
                    //NewPANDetails(PANresult);
                    AjaxPAN();
                }
                else if (JSON.parse(data.EditPersonalDetailsResult)["MyInfo"] == "S" && PANresult["panStatus"] == "Failed") {
                    hideBusyInd();
                    fncValidateMsg(PANresult["message"]);
                    onClickPersonalDtls(1);
                }
                else {
                    hideBusyInd();
                    fncValidateMsg("My info data submission failed.");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideBusyInd();
                fncAlert("Sorry,error occured unable to process your request.");
            }
        });

    }

    function EmployeeDetails(EmployeeData) {
        empObj = new Object();
        var Empfinaldata = new Array();
        var Empdata = EmployeeData.GetEmployeeDetailsResult;
        //By Kalyan
        empObj.strCflg = Empdata.strCflg;
        //empObj.strEncValue = Empdata.EncE;
        //$(".theFileInput").on("change", UploadFile);
    }

    function capturePFData() {//PF check
        if (locationChk.toUpperCase() != "ODR") {

            if (fatherName == "NA") {
                fatherChk = "N";
            }
            if (motherName == "NA") {
                motherChk = "N";
            }
            if (spouseName == "NA") {
                spouseChk = "N";
            }
        }
    }


    function PersonalDetails(PersonalData) {

        $(".person_img").empty();
        $("#divPDname").empty();
        $("#divPDmailID").empty();
        $("#dvDOB").empty();


        //----------by default hiding submit button--------//

        $("#btnPDsbmt").hide();

        //------Checking if personal details section is already in EDITABLE state------//

        if ($('#IsEditMyInfo').val() == "1") {
            $("#btnPDsbmt").show();
        }


        $(".person_img").append(PersonalData.GetPersonalDtlsResult.strimg);

        $(".person_img").append('<div class="fileUpload btn btn-primary"><span><img src="images/edit_icon.png"></img></span><input type="file" class="upload theFileInput" /></div>');
        //$(".person_img").append('<div><button class="buton_image_pic btn_edit_pic" data-role="none"><input type="file" class="theFileInput" style="left:11px;width:50px;height:50px;cursor:pointer;" data-role="none">$nbsp;$nbsp;$nbsp;</input></button></div>');

        $(".theFileInput").on("change", UploadFile);


        $("#divPDmailID").append(CheckEmptyVal(PersonalData.GetPersonalDtlsResult.strmailID));

        if (strBenflg == "Y") {
            $.getScript("js/myBenfts.js").done(function () {
                AjaxGetBenftDetails();
            });
        }


        PersonalArray = JSON.parse(PersonalData.GetPersonalDtlsResult.strRetmg);

        flgWorkCountry = CheckEmptyVal(PersonalArray.H_LAND).toString();
        flgNationality = CheckEmptyVal(PersonalArray.LANDX).toString();

        //----------by default hiding Nominee Section--------//
        $("#dvNominee").hide();

       

        //Validation for EPF, EPS and UAN

        PFNominationChk = CheckEmptyVal(PersonalArray.NMTDYN).toString();
        fatherName = CheckEmptyVal(PersonalArray.FTHRNAME).toString();
        motherName = CheckEmptyVal(PersonalArray.MTHRNAME).toString();
        spouseName = CheckEmptyVal(PersonalArray.SPSENAME).toString();
        fatherDOB = CheckEmptyVal(PersonalArray.FTHRDOB).toString();
        motherDOB = CheckEmptyVal(PersonalArray.MTHRDOB).toString();
        spouseDOB = CheckEmptyVal(PersonalArray.SPSEDOB).toString();
        if (PersonalArray.NMNRLSP.indexOf(Father) > -1) {
            nmRel = CheckEmptyVal(PersonalArray.NMNRLSP).toString();
            nmName = CheckEmptyVal(PersonalArray.NMNNAME).toString();
            nmDOB = CheckEmptyVal(PersonalArray.NMNDOB).toString();
            nmShare = CheckEmptyVal(PersonalArray.NMNSHARE).toString();
        }
        locationChk = CheckEmptyVal(PersonalArray.ACTION).toString();

        $("#txtPDprevPF,#txtPDprevEPS,#txtPDprevUAN").change(function () {
            if (($("#txtPDprevPF").val().length > 0) || ($("#txtPDprevEPS").val().length > 0) || ($("#txtPDprevUAN").val().length>0))
            if (locationChk.toUpperCase() != "ODR") {
                capturePFData();
                var Nominee = "Father";
                if (Nominee == "Father") {
                    if (fatherChk == "N") {
                        //$('.father_sec').removeClass('disply_none');
                       // $('.edit_off_field').css('display', 'block');
                        $('.fathercls').css('display', 'block');
                        $('.father_sec').slideDown('slow');
                    }
                }
            }
        });


        /*Start  tultip on 7/17/2015*/
        $('.address_pop5').focusin(function () {
            $(this).siblings('.address,.arrw_img').css('display', 'block');

        });
        $('.address_pop5').focusout(function () {
            $(this).siblings('.address,.arrw_img').css('display', 'none');

        });

        $('.address_pop6').focusin(function () {
            $(this).siblings('.address,.arrw_img').css('display', 'block');

        });
        $('.address_pop6').focusout(function () {
            $(this).siblings('.address,.arrw_img').css('display', 'none');
        });

        $('.address_pop7').focusin(function () {
            $(this).siblings('.address,.arrw_img').css('display', 'block');
        });
        $('.address_pop7').focusout(function () {
            $(this).siblings('.address,.arrw_img').css('display', 'none');
        });

        $('.address_pop8').focusin(function () {
            $(this).siblings('.address,.arrw_img').css('display', 'block');

        });
        $('.address_pop8').focusout(function () {
            $(this).siblings('.address,.arrw_img').css('display', 'none');
        });
        /*End  tultip on 7/17/2015*/


        $("#divPDname").append(CheckEmptyVal(PersonalArray.ENAME));

        $("#lblPDFName").text(CheckEmptyVal(PersonalArray.ENAME));

        $("#lblPDgendr").text(toProperCase(CheckEmptyVal(PersonalArray.GESCH)));
        if (PersonalArray.GBDAT == "01.01.1900" || PersonalArray.GBDAT == "01.01.1960") {
            $("#dvDOB").append('<div class="field_name" >Date of birth</div><label data-role="none" class="personal_dtls non_edit_off" id="lblPDdob"></label><input type="text" data-role="none" class="edit_off_field datepickerExcptMyoffce" id="txtPDdob" />');
            $("#lblPDdob").text(PersonalArray.GBDAT);
            $("#txtPDdob").val(PersonalArray.GBDAT);
            $('.datepickerExcptMyoffce').datetimepicker({
                timepicker: false,
                maxDate: new Date(),
                closeOnDateSelect: true,
                format: 'd.m.Y',
                formatDate: 'd.m.Y',
                changeMonth: true,
                changeYear: true
            });
        }
        else {
            $("#dvDOB").append('<div class="field_name" >Date of birth</div><label data-role="none" class="personal_dtls" id="lblPDdob"></label><input type="text" data-role="none" style="display:none" id="txtPDdob" />');
            $("#lblPDdob").text(PersonalArray.GBDAT);
            $("#txtPDdob").val(PersonalArray.GBDAT);
        }

        $("#lblPDcntry").text(CheckEmptyVal(PersonalArray.LANDX));

        $("#lblPDnatl").text(PersonalArray.NATIO );
        //---hidden field values-----//
        if (PersonalArray.LAND_CODE != null && PersonalArray.LAND_CODE != "NA" && PersonalArray.LAND_CODE != undefined) {
            $("#hdnLandx_Code").val(PersonalArray.LAND_CODE);
        }
        else {
            $("#hdnLandx_Code").val("");
        }

        if (PersonalArray.NATIO_CODE != null && PersonalArray.NATIO_CODE != "NA" && PersonalArray.NATIO_CODE != undefined) {
            flgPDService = "T";
            $("#hdnNatio_Code").val(PersonalArray.NATIO_CODE);
        }
        else {
            $("#hdnNatio_Code").val("");
        }

        
        if ( $("#hdnNatio_Code").val()=="") {
            $("#txtPDnatl").val(PersonalArray.NATIO);
        }
        else {
            $("#txtPDnatl").val(PersonalArray.NATIO + "-" + PersonalArray.NATIO_CODE);
        }


       // $("#txtPDnatl").val(PersonalArray.NATIO + "-" + PersonalArray.NATIO_CODE);

        $("#lblPDbldg").text(BloodGroup(PersonalArray.STEXT));
        $("#ddlPDbldg").val(PersonalArray.STEXT);


        $("#lblPDpob").text(PersonalArray.GBORT);
        $("#txtPDpob").val(PersonalArray.GBORT);

        $("#lblPDlng").text(PersonalArray.ZZMOTTONG);
        $("#txtPDlng").val(PersonalArray.ZZMOTTONG);

        $("#lblPDmarsts").text(MartialStatus(PersonalArray.FTEXT));
        $("#ddlPDmarsts").val(PersonalArray.FTEXT);

        $("#lblPDctzn1").text(PersonalArray.ZZNAT1);
        $("#txtPDctzn1").val(PersonalArray.ZZNAT1);

        $("#lblPDctzn2").text(CheckEmptyVal(PersonalArray.ZZNAT2));
        $("#txtPDctzn2").val((CheckEmptyVal(PersonalArray.ZZNAT2)));

        $("#lblPDpass").text(PersonalArray.DOCN1);


        
   
        $("#hdnPDflnme").val(PersonalArray.ENAME);

        $("#hdnPDlstnme").val(PersonalArray.NACHN);

        $("#hdnPDfrstnme").val(PersonalArray.VORNA);

        $("#hdnPDgndr").val(PersonalArray.GESCH);

        $("#hdnPDdob").val(PersonalArray.GBDAT);

        $("#hdnPDcntry").val(PersonalArray.LANDX);

        $("#hdnPDdoj").val(PersonalArray.ZZDTEJN);

        $("#hdnPDmdte").val(PersonalArray.FAMDT);

        $("#hdnPDchld").val(PersonalArray.ANZKD);

        $("#hdnPDpasprt").val(PersonalArray.DOCN1);

        $("#hdnPDEmpStatus").val(PersonalArray.ACTION);

        if (PersonalArray.NATIO != "Indian") {
            $("#liPDpan").hide();
            $("#liPDupload").hide();
            $("#liPDRjctnReasn").hide();
            $("#liPDdwnld").hide();
            PANNationalityIndian = 0;

        } else {
            $("#liPDpan").show();
            PANNationalityIndian = 1;
        }


        if ((flgWRegion.toUpperCase() == "OFFSHORE") || ((flgWRegion.toUpperCase() == "ONSITE") && (flgBnkPrevCoun.toUpperCase() == "IN"))) {

            if (PersonalArray.PREVIOUS_UAN == "NA") {
                $("#lblPDprevUAN").text("");
                $("#txtPDprevUAN").val("");
            }
            else {
                $("#lblPDprevUAN").text(replaceCPwithAM(PersonalArray.PREVIOUS_UAN.toUpperCase()));
                $("#txtPDprevUAN").val(replaceCPwithAM(PersonalArray.PREVIOUS_UAN.toUpperCase()));
            }

            if (PersonalArray.PREVIOUS_PF == "NA") {
                $("#lblPDprevPF").text("");
                $("#txtPDprevPF").val("");
            }
            else {
                $("#lblPDprevPF").text(replaceCPwithAM(PersonalArray.PREVIOUS_PF.toUpperCase()));
                $("#txtPDprevPF").val(replaceCPwithAM(PersonalArray.PREVIOUS_PF.toUpperCase()));
            }

            if (PersonalArray.UID_NUM == "NA") {
                $("#lblPDUID").text("");
                $("#txtPDUID").val("");
            }
            else {
                $("#lblPDUID").text(replaceCPwithAM(PersonalArray.UID_NUM.toUpperCase()));
                $("#txtPDUID").val(replaceCPwithAM(PersonalArray.UID_NUM.toUpperCase()));
            }

            if (PersonalArray.EPS_NUM == "NA") {
                $("#lblPDprevEPS").text("");
                $("#txtPDprevEPS").val("");
            }
            else {
                $("#lblPDprevEPS").text(replaceCPwithAM(PersonalArray.EPS_NUM.toUpperCase()));
                $("#txtPDprevEPS").val(replaceCPwithAM(PersonalArray.EPS_NUM.toUpperCase()));
            }
        }
        else {
            $("#liPDprevPF").hide();
            $("#liPDprevEPS").hide();
            $("#liPDUID").hide();
            $("#liPDprevUAN").hide();
        }

    }

    function uploadBlobOrFile(blobOrFile) {
        showBusyInd();
        var fileName = "RAJASEA_" + blobOrFile.name;
        var xhr = new XMLHttpRequest();
        var url = "http://myprofileuat.wipro.com/UploadPhoto/";
        xhr.open('POST', url, true);
        try {

            if (blobOrFile.type == "application/pdf" || blobOrFile.type == "image/jpeg") {
                xhr.setRequestHeader("FN", fileName);
                inviteFileName = fileName;
                if (blobOrFile.size < 1000000) {
                    xhr.onreadystatechange = function () {
                        hideBusyInd();
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            fncAlert(fileName + " uploaded successfully.");
                        } else if (xhr.readyState != 0 && xhr.readyState != 1 && xhr.readyState != 2 && xhr.readyState != 3) {
                            $("#txtInvite").val("");
                            fncAlert("Error occured: File upload failed.");
                        }
                    };
                    xhr.send(blobOrFile);
                } else {
                    hideBusyInd();
                    $("#txtInvite").val("");
                    fncAlert("Invitation letter size should not be greater than 1 MB. Current uploaded file: "
                                             + blobOrFile.name
                                             + ", Size: "
                                             + blobOrFile.size
                                             + " Bytes.");
                }
            } else {
                hideBusyInd();
                $("#txtInvite").val("");
                fncAlert("Only image and PDF files allowed to upload as invitation letter.");
            }
        } catch (err) {
            hideBusyInd();
            fncAlert("File names with alpha numeric characters not allowed."
                               + err.message);
        }
    }

function PANDetails(PANData) {

    var PANResult = JSON.parse(PANData.GetPANDetailsResult);
    PAN = JSON.parse(PANResult.jasonResultSet);

    $("#liPDpan").empty();
    $("#liPDupload").empty();
    $("#liPDRjctnReasn").empty();
    $("#liPDdwnld").empty();

    if (PAN.panStatus == "Approved" || PAN.panStatus == "Pending for Approval") {
        PANEdit = "NO";
        $("#liPDpan").append('<div class="field_name">PAN Number</div>'
                        + '<label data-role="none" id="lblPDpan">' + PAN.pan + '</label>'

                         );

        if (PAN.panStatus == "Pending for Approval" && PANResult.empNumber != "Test") {

            $("#liPDdwnld").append(PANResult.empNumber);
        }
    }
        //-----------PAN status Not applied ,rejected or failed------------------------------------------------------------
    else {

        PANEdit = "YES";

        $("#liPDpan").append('<div class="field_name">PAN Number</div>'
                          + '<label data-role="none" class="non_edit_off" id="lblPDpan">Not Applied</label>'
                           + '<input type="text" data-role="none" class="edit_off_field" id="txtPDpan" maxlength="10"/>'
                           );
        if (PANResult.empNumber != "Test") {

            $("#liPDupload").append('<div class="field_name edit_off_field">Document Max FIle size(4 MB)</div>'

                + '<div class="styleFileInput1 edit_off_field">'
                 + '<input type="text" class="browseText" data-role="none" readonly/>'
                 + '<input type="button" value="Browse" class="buton_image browse_btn browseButton" data-role="none"/>'
                  + '<input type="file"  class="theFileInput1" data-role="none"/>'
                   + '<div class="clear"></div>'
                    + '</div>');

            if (PAN.panStatus == "Rejected") {

                $("#liPDpan").empty();

                $("#liPDpan").append('<div class="field_name">PAN Number</div>'
                          + '<label data-role="none" class="non_edit_off" id="lblPDpan">' + PAN.pan + '</label>'
                           + '<input type="text" data-role="none" class="edit_off_field" value="' + PAN.pan + '" id="txtPDpan"/>'
                           );

                $("#liPDRjctnReasn").append('<div class="field_name">Reason For Rejection</div>'
                          + '<label data-role="none">' + PAN.rejectionReason + '</label>'

                    );

                $("#liPDdwnld").append(PANResult.empNumber);

            }
            $(".theFileInput1").on("change", AssingFileName);
            function AssingFileName() {
                if ($(".theFileInput1").length > 0) {
                    fileData = $(".theFileInput1")[0].files[0];
                    if (fileData != undefined) {
                        $('.browseText').val(fileData.name);
                    }
                }
            }

        }

    }
    if (flgeditEnable == 1) {
        $(".personl_dtls_edit_MyInfo").trigger("click");
        if ($("#btnPDsbmt").is(":visible") == false)
            $(".personl_dtls_edit_MyInfo").trigger("click");
    }
}

function NewPANDetails(NewPANData, PANimg) {

    //NewPANArray = JSON.parse(NewPANData.EditPANDetailsResult);
    NewPANArray = new Array();
    NewPANArray = NewPANData;
    $("#liPDpan").empty();
    $("#liPDupload").empty();
    $("#liPDRjctnReasn").empty();
    $("#liPDdwnld").empty();

    if (NewPANArray.panStatus == "Approved" || NewPANArray.panStatus == "Pending for Approval") {
        PANEdit = "NO";
        $("#liPDpan").append('<div class="field_name">PAN Number</div>'
                        + '<label data-role="none" id="lblPDpan">' + NewPANArray.pan + '</label>'

                         );
        if (PANimg != "Test") {

            $("#liPDdwnld").append(JSON.parse(data.UploadPanDocumentResult)["PANimg"]);

        }
    }
        //-----------PAN status Not applied ,rejected or failed------------------------------------------------------------
    else {
        PANEdit = "YES";
        $("#liPDpan").append('<div class="field_name">PAN Number</div>'
                          + '<label data-role="none" class="non_edit_off" id="lblPDpan">Not Applied</label>'
                           + '<input type="text" data-role="none" class="edit_off_field" id="txtPDpan" maxlength="10"/>'
                           );
        if (PANimg != "Test") {
            $("#liPDupload").append('<div class="field_name">Document Max FIle size(4 MB)</div>'

                + '<div class="styleFileInput1">'
                 + '<input type="text" class="browseText" data-role="none" readonly/>'
                 + '<input type="button" value="Browse" class="buton_image browse_btn browseButton" data-role="none"/>'
                  + '<input type="file"  class="theFileInput1" data-role="none"/>'
                   + '<div class="clear"></div>'
                    + '</div>');

            if (NewPANArray.panStatus == "Rejected") {

                $("#liPDRjctnReasn").append('<div class="field_name">Reason For Rejection</div>'
                          + '<label data-role="none">' + NewPANArray.rejectionReason + '</label>'

                    );

            }
        }

    }
}

function UploadFile() {
        // grab your file object from a file input
        showBusyInd();
        if ($(".theFileInput").length > 0) {
            fileData = $(".theFileInput")[0].files[0];
            if (fileData != undefined) {
                var fileType = fileData.name.split('.');
                if (fileType.length == 2) {
                    fileType = fileType[1].toLowerCase();
                    if (fileType != "jpg") {
                        fncAlert("Please upload only jpg image.");
                        hideBusyInd();
                        return false;
                    }
                }
                else {
                    hideBusyInd();
                    fncValidateMsg("Please upload a valid jpg image.");
                    return false;
                }
                var data = new FormData();

                $.ajax({
                    url: ServURL + "UploadMyImage?fileName=" + fileData.name,
                    type: "POST",
                    data: fileData,
                    cache: false,
                    dataType: "json",
                    crossDomain: true,
                    processData: false, // Don't process the files
                    contentType: "text/plain", // Set content type to false as jQuery will tell the server its a query string request
                    success: function (data) {
                        hideBusyInd();
                        sessionStorage.setItem("1", true);
                        location.reload(true);
                    },
                    error: function (data) {
                        hideBusyInd();
                        fncAlert("Some error occurred.");
                    }
                });
            }
            else {
                fncAlert("Please upload a image.");
                hideBusyInd();
                return false;
            }
        }
        else {
            fncAlert("Please upload a image.");
            hideBusyInd();
            return false;
        }
    }

    function UploadPANFile(EditedData, newPAN, InfoFDEditArray) {
        // grab your file object from a file input
        showBusyInd();
        //By Kalyan
        if (empObj.strCflg == "1") {
            if ($(".theFileInput1").length > 0) {
                fileData = $(".theFileInput1")[0].files[0];
                if (fileData != undefined) {
                    var fileType = fileData.name.split('.');
                    if (fileType.length == 2) {
                        fileType = fileType[1].toLowerCase();
                        var fileContentType = fileData.type;

                        if (!(fileType == "pdf" || fileType == "jpeg" || fileType == "jpg")) {

                            hideBusyInd();
                            fncValidateMsg("Please upload only PDF or jpg or jpeg file.");
                            return false;
                        }
                    }
                    else {
                        hideBusyInd();
                        fncValidateMsg("Please upload a valid PDF or jpg or jpeg file.");
                        return false;
                    }
                }
                else {
                    fileData = "";
                    fileType = "";
                }
            }
            else {
                fileData = "";
                fileType = "";
            }
        }
        else {
            fileData = "";
            fileType = "";
        }

    var data = new FormData();
    $.ajax({
        url: ServURL + "UploadPanDocument?fileName=" + fileData.name + "&fileType=" + fileContentType + "&PANnumber=" + newPAN + "&EditedData=" + EditedData + "&FatherData=" + InfoFDEditArray,
        type: "POST",
        data: fileData,
        cache: false,
        dataType: "json",
        crossDomain: true,
        processData: false, // Don't process the files
        contentType: "text/plain", // Set content type to false as jQuery will tell the server its a query string request
        success: function (data) {
            $("#noteMsgP").hide();
            if (JSON.parse(data.UploadPanDocumentResult)["MyInfo"] != "S") {
                fncAlert(JSON.parse(data.UploadPanDocumentResult)["MyInfo"].toString());
            }
            else {
                if (JSON.parse(data.UploadPanDocumentResult)["PAN"] != "") {
                    var PANresult = JSON.parse(JSON.parse(data.UploadPanDocumentResult)["PAN"]);
                    var PANimg = JSON.parse(data.UploadPanDocumentResult)["PANimg"];
                    if (JSON.parse(data.UploadPanDocumentResult)["MyInfo"] == "S" && PANresult["panStatus"] != "Failed") {
                        //1 1 
                        NewPANArray = new Array();
                        onClickPersonalDtls(1);
                        NewPANDetails(PANresult, PANimg);
                        LoadResetData();
                        hideBusyInd();
                        fncAlert("Data submitted successfully.");
                    }
                    else if (JSON.parse(data.UploadPanDocumentResult)["MyInfo"] == "S" && PANresult["panStatus"] == "Failed") {
                        //1 0 
                        onClickPersonalDtls(1);
                        hideBusyInd();
                        if (PANresult["message"] == "") {
                            fncValidateMsg(PANresult["panMsg"]);
                        }
                        else {
                            fncValidateMsg(PANresult["message"]);
                        }
                    }
                    else if (JSON.parse(data.UploadPanDocumentResult)["MyInfo"] != "S" && PANresult["panStatus"] != "Failed") {
                        //0 1 
                        onClickPersonalDtls(1);
                        LoadResetData();
                        hideBusyInd();
                        fncAlert(JSON.parse(data.UploadPanDocumentResult)["MyInfo"].toString());
                    }
                    else {
                        //0 0 
                        LoadResetData();
                        hideBusyInd();
                        fncAlert("My info data submission failed.");
                    }
                }
                else {
                    if (JSON.parse(data.UploadPanDocumentResult)["MyInfo"] == "S") {
                        // 1 
                        onClickPersonalDtls(1);
                        LoadResetData();
                        hideBusyInd();
                        fncAlert("Data submitted successfully.");

                    }
                    else {
                        //0 
                        LoadResetData();
                        hideBusyInd();
                        fncAlert("My info data submission failed.");
                    }
                }
            }
        },
        error: function (data) {
            LoadResetData();
            //$('#btnPDsbmt').hide();
            hideBusyInd();
            fncAlert("Sorry,error occured while processing your request.");
        }
    });

}

    function PanImageCall() {
        //var canvas = document.createElement("canvas");
        // var img1 = document.createElement("img");
        var p = document.getElementById("FileUpload");
        //var filePath = $('#FileUpload').val();
        //var filePath = document.getElementById("FileUpload").files[0].fileName;
        //img1.setAttribute('src', p.value);

        //var ctx = canvas.getContext("2d");
        //var img1 = document.getElementById("testImg");
        //canvas.width = img1.width;
        //canvas.height = img1.height;
        //ctx.drawImage(img1, 0, 0);
        //var dataURL = canvas.toDataURL("image/png");
        //var returnUrl = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        var objParameter = { "imgbinaryarray": "ABC" };
        $.ajax({
            type: "POST",
            url: ServURL + "ImgUpload",
            data: JSON.stringify(objParameter),
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            // crossDomain: true,       
            statusCode: {
                0: function (data) {
                    alert("Network Error");
                },
                4: function (data) {
                    alert(data);
                },
                200: function (data) {
                    // TravelPrefrences(data);
                    alert(data);
                    //   var panimgarry = new Array();
                    //   panimgarry = JSON.parse(data);
                    //   var base64Data = panimgarry.softCopy;
                    //   //alert("hi");
                    //   var imag = "<img "
                    //+ "src='" + "data:image/png;base64,"
                    //+ base64Data + "'/>";
                    //       $("#divImageHolder").append('<img '
                    //           +'src="data:image/jpg;base64,'+base64Data+'"/>');
                },
                400: function (data) {
                    alert("Bad Request");
                },
                404: function (data) {
                    aler("404 error/File Not Found");
                },
                405: function (data) {
                    alert("405 error");
                }
            }

        });

    }

    /******************************Personal Details Section Ends ***************************/

    /****************************** Validation/Alert Function Starts ***************************/

    function SAPdate(strInpDateParts) {
        if (strInpDateParts != 0 || strInpDateParts != "" || strInpDateParts != undefined) {

            //    alert(strInpDateParts);
            var inpDay = strInpDateParts.toString().substr(0, 2);
            var inpYear = strInpDateParts.toString().substr(6, 4);
            var inpMonth = strInpDateParts.toString().substr(3, 2);

            //var strInpDateToEnter = inpYear+inpMonth+inpDay;
            var strInpDateToEnter = inpDay + '.' + inpMonth + '.' + inpYear;

            return strInpDateToEnter;
        }
        else {
            return strInpDateParts;
        }
    }

    function SAPdateFatherDD(strInpDateParts) {
        if (strInpDateParts != 0 || strInpDateParts != "" || strInpDateParts != undefined) {

            //    alert(strInpDateParts);
            var inpDay = strInpDateParts.toString().substr(0, 2);
            var inpYear = strInpDateParts.toString().substr(6, 4);
            var inpMonth = strInpDateParts.toString().substr(3, 2);

            //var strInpDateToEnter = inpYear+inpMonth+inpDay;
            var strInpDateToEnter = inpYear + inpMonth + inpDay;

            return strInpDateToEnter;
        }
        else {
            return strInpDateParts;
        }
    }

    function CheckEmptyVal(Value) {

        if (Value == 0 || Value == undefined || Value == "" || Value == "Select") {
            return "NA";
        }
        else {
            return Value;
        }

    }

    function fncAlert(strText) {
        $("html, body").css("overflow", "hidden");
        if (strText.indexOf("country") > -1) {
            $("#ddlPDTstate").empty();
        }
        if (strText.indexOf("USA employees") > -1) {
            $(".Salry_act").hide();
        }
        $('#divalrt2').html(strText);
        $('.popup_main2').fadeIn();
        $('.over_ley').fadeIn();
        $("html, body").css("overflow", "hidden");
        $('.no_btn2').show();
        $('#btnPopupOK').hide();
        $('.address_pop5').siblings('.address,.arrw_img').css('display', 'none');
        $('.address_pop6').siblings('.address,.arrw_img').css('display', 'none');
        $('.address_pop7').siblings('.address,.arrw_img').css('display', 'none');
        $('.address_pop8').siblings('.address,.arrw_img').css('display', 'none');
        $('.address_pop9').siblings('.address,.arrw_img').css('display', 'none');
        $('.address_pop10').siblings('.address,.arrw_img').css('display', 'none');
        $('.address_pop11').siblings('.address,.arrw_img').css('display', 'none');

        window.setTimeout(function () {

            $('.popup_main2').fadeOut();
            $('.over_ley').fadeOut();
            $('.no_btn2').click();
            $("html, body").css("overflow", "auto");

        }, 10000);
    }

    function OnErrorImage(imgPDmyImage) {

        var img = imgPDmyImage.id;
        //var strimg = img.replace("imgPDmyImage", "spnimg");
        $('.person_img').empty();
       
        $('.person_img').append('<img class="person_pic" src="images/photo.jpg"/>');
        $(".person_img").append('<div class="fileUpload btn btn-primary"><span><img src="images/edit_icon.png"></img></span><input type="file" class="upload theFileInput" /></div>');

        $(".theFileInput").on("change", UploadFile);

    }

    function LoadResetData() {
        $('#IsEditTravelPref').val('0');
        $('#IsEditPassport').val('0');
        $('#IsEditMyInfo').val('0');
        $('#IsEditSpouse').val("0");
        $('#IsEditFather').val("0");
        $('#IsEditChld').val("0");
        $('#IsAddChld').val("0");
        $('#IsEditAddtnl').val("0");
        $('#IsAddAddtnl').val("0");
        $('#IsEditTempAddrss').val("0");
        $('#IsEditPerAddrss').val("0");
        $('#IsEditHostTempAddrss').val("0");
        $('#IsEditHostPerAddrss').val("0");
        $('#IsEditEmrAddrss').val("0");
        $('#IsAddEmergncyAddress').val("0");
        $('#IsEditDsgnatn').val("0");
        $('#IsAddPassport').val("0");
        $('#IsAddTravelDetails').val("0");

    }

    function FlagReset() {


        Child = "E";
        Addtnl = "E";
        EmergncyAddr = "Error";
    }

    function BloodGroup(BloodGroupValue) {

        switch (BloodGroupValue) {
            case "01":
                BloodGroupText = "A+";
                break;
            case "02":
                BloodGroupText = "A-";
                break;
            case "03":
                BloodGroupText = "B+";
                break;
            case "04":
                BloodGroupText = "B-";
                break;
            case "05":
                BloodGroupText = "O+";
                break;
            case "06":
                BloodGroupText = "O-";
                break;
            case "07":
                BloodGroupText = "AB+";
                break;
            case "08":
                BloodGroupText = "AB-";
                break;
            case "09":
                BloodGroupText = "A Rh-";
                break;
            case "10":
                BloodGroupText = "A1 -ve";
                break;
            case "11":
                BloodGroupText = "A1 +ve";
                break;
            case "12":
                BloodGroupText = "A1B+";
                break;
            case "13":
                BloodGroupText = "A1B-";
                break;
            case "14":
                BloodGroupText = "";
                break;
            case "15":
                BloodGroupText = "A2B-ve";
                break;
            case "16":
                BloodGroupText = "A2B+";
                break;
            case "17":
                BloodGroupText = "A2 -ve";
                break;
            case "18":
                BloodGroupText = "A2 +ve";
                break;
            case "19":
                BloodGroupText = "B1 +ve";
                break;
            default:
                BloodGroupText = "Not specified";
        }
        return BloodGroupText;
    }

    function MartialStatus(MartialStatusValue) {

        switch (MartialStatusValue) {
            case "Single":
                MartialStatusText = "Single";
                break;
            case "Marr.":
                MartialStatusText = "Married";
                break;
            case "Wid.":
                MartialStatusText = "Widow";
                break;
            case "Div.":
                MartialStatusText = "Divorcee";
                break;
            case "NM":
                MartialStatusText = "Never married";
                break;
            case "Sep.":
                MartialStatusText = "Separated";
                break;
            case "Cohab.":
                MartialStatusText = "Cohabitation";
                break;
            case "Widr":
                MartialStatusText = "Widower";
                break;
            default:
                MartialStatusText = "Not specified";
        }
        return MartialStatusText;
    }

    function toProperCase(str) {
        var noCaps = ['of', 'a', 'the', 'and', 'an', 'am', 'or', 'nor', 'but', 'is', 'if', 'then',
    'else', 'when', 'at', 'from', 'by', 'on', 'off', 'for', 'in', 'out', 'to', 'into', 'with'];
        return str.replace(/\w\S*/g, function (txt, offset) {
            if (offset != 0 && noCaps.indexOf(txt.toLowerCase()) != -1) {
                return txt.toLowerCase();
            }
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function replaceHSwithPP(Input) {
        var find = '#';
        var re = new RegExp(find, 'g');
        var res = Input.replace(re, '=');
        return res;
    }

    function replacePPwithHS(Input) {
        var find = '=';
        var re = new RegExp(find, 'g');
        var res = Input.replace(re, '#');
        return res;
    }

    function replaceAMwithCP(Input) {
        var find = '&';
        var re = new RegExp(find, 'g');
        var res = Input.replace(re, '~');
        return res;
    }

    function replaceCPwithAM(Input) {
        var find = '~';
        var re = new RegExp(find, 'g');
        var res = Input.replace(re, '&');
        return res;
    }

    function validateMyInfoDetails() {
        //Self validation

        var DOB = $("#txtPDdob").val();
        var prevUAN = $("#txtPDprevUAN").val().toUpperCase();
        var prevPF = $("#txtPDprevPF").val().toUpperCase();
        var prevEPS = $("#txtPDprevEPS").val().toUpperCase();
        var UID = $("#txtPDUID").val().toUpperCase();

        var res = $("#txtPDnatl").val().split("-");
        var MyInfoNationality = res[0];

        var MyInfoPlaceOfBrth = $("#txtPDpob").val();
        var MyInfoMothrTngue = $("#txtPDlng").val();

        var MyInfoCitizen1 = $("#txtPDctzn1").val();

        var MyInfonewPAN = $("#txtPDpan").val();

        var isError = false;
        var strTotalErrorMessage = "<ol>"

        if (DOB == "NaN" || DOB == "" || DOB==undefined) {
            isError = true;
            strTotalErrorMessage += "<li>'DOB is a mandatory field.</li><br/>";
        }
        if (MyInfoNationality == "") {
            isError = true;
            strTotalErrorMessage += "<li>'Nationality' is a mandatory field.</li><br/>";
        }
        if (MyInfoPlaceOfBrth == "") {
            isError = true;
            strTotalErrorMessage += "<li>'Place of birth' is a mandatory field.</li><br/>";
        }
        if (MyInfoMothrTngue == "") {
            isError = true;
            strTotalErrorMessage += "<li>'Mother tongue' is a mandatory field.</li><br/>";
        }
        if (MyInfoCitizen1 == "") {
            isError = true;
            strTotalErrorMessage += "<li>'Citizenship1' is a mandatory field.</li><br/>";
        }
        if (MyInfoNationality == "Indian") {
            if (MyInfonewPAN == "") {
                isError = true;
                strTotalErrorMessage += "<li>'PAN number' is a mandatory field.</li><br/>";
            }
        }
        if ((flgWRegion.toUpperCase() == "OFFSHORE") || ((flgWRegion.toUpperCase() == "ONSITE") && (flgBnkPrevCoun.toUpperCase() == "IN"))) {
            if (prevPF == "" || prevPF == "NA" || prevPF == "NOT AVAILABLE") {
                isError = true;
                strTotalErrorMessage += "<li>'Please enter a valid PF number or not applicable if there is no previous PF number.</li><br/>";
            }
            if (prevEPS == "" || prevEPS == "NA" || prevEPS == "NOT AVAILABLE") {
                isError = true;
                strTotalErrorMessage += "<li>'Please enter a valid EPS number or not applicable if there is no previous EPS number.</li><br/>";
            }
            if (UID == "" || UID == "NA" || UID == "NOT APPLICABLE") {
                isError = true;
                strTotalErrorMessage += "<li>'Please enter a valid UID number or not available if there is no UID card.</li><br/>";
            }
            if (prevUAN == "" || prevUAN == "NA" || prevUAN == "NOT AVAILABLE") {
                isError = true;
                strTotalErrorMessage += "<li>'Please enter a valid UAN or not applicable if there is no UAN.</li><br/>";
            }
           // debugger;
            if (($("#txtPDprevPF").val().length > 0) || ($("#txtPDprevEPS").val().length > 0) || ($("#txtPDprevUAN").val().length > 0))
                if (locationChk.toUpperCase() != "ODR") {
                    capturePFData();
                    var Nominee = "Father";
                    if (Nominee == "Father") {
                        if (fatherChk == "N" || fatherName == "") {
                            fatherChk = "N";
                            //$("#txtFTFNM").val(
                            $('.fathercls').css('display', 'block');
                            $('.father_sec').slideDown('slow');
                        }
                        else
                            fatherChk = "l";
                    }
                }
        }
        //Father Validation
        if(fatherChk=="N")
        {
            if ($("#txtFTFNM").val() == "") {
                isError = true;
                strTotalErrorMessage += "<li>'Father' First name is a mandatory field.</li>";
            }
            if ($("#txtFTLNM").val() == "") {
                isError = true;
                strTotalErrorMessage += "<li>'Father' Last name is a mandatory field.</li>";
            }
            if ($("#txtDOB").val() == "NaN" || $("#txtDOB").val() == "") {
                isError = true;
                strTotalErrorMessage += "<li>'Father' Date of birth' is a mandatory field.</li>";
            }
            if ($("#txtFTNatio").val() == "") {
                isError = true;
                strTotalErrorMessage += "<li>'Father' Nationality is a mandatory field.</li>";
            }
        }
        if ($(".theFileInput1").is(":visible") == true) {
            if ($(".theFileInput1").length > 0) {
                if ($(".theFileInput1")[0].files[0] == undefined) {
                    isError = true;
                    strTotalErrorMessage += "<li>Please upload soft copy for PAN NUMBER .</li>";
                }
            }
        }
        strTotalErrorMessage += "</ol>";
        if (strTotalErrorMessage.indexOf("<ol></ol>") <= -1) {
            isError = true;
        }
        return {
            isError: isError,
            errorMsg: strTotalErrorMessage
        };

    }

    function fncdate(strInpDateParts) {
        if (strInpDateParts == "00000000" || strInpDateParts==undefined) {
            return '';
        }
        var inpDay = strInpDateParts.toString().substr(6, 2);
        var inpYear = strInpDateParts.toString().substr(0, 4);
        var strInpMonth = strInpDateParts.toString().substr(4, 2);
        //var inpMonth = 0;
        //switch (strInpMonth) {
        //    case '01':
        //        inpMonth = "JAN";
        //        break;
        //    case '02':
        //        inpMonth = "FEB";
        //        break;
        //    case '03':
        //        inpMonth = "MAR";
        //        break;
        //    case '04':
        //        inpMonth = "APR";
        //        break;
        //    case '05':
        //        inpMonth = "MAY";
        //        break;
        //    case '06':
        //        inpMonth = "JUN";
        //        break;
        //    case '07':
        //        inpMonth = "JUL";
        //        break;
        //    case '08':
        //        inpMonth = "AUG";
        //        break;
        //    case '09':
        //        inpMonth = "SEP";
        //        break;
        //    case '10':
        //        inpMonth = "OCT";
        //        break;
        //    case '11':
        //        inpMonth = "NOV";
        //        break;
        //    case '12':
        //        inpMonth = "DEC";
        //        break;
        //}
        var strInpDateToEnter = inpDay + '.' + strInpMonth + '.' + inpYear;
        return strInpDateToEnter;
    }

    function ConvertToJsonDate(strDate) {
        if (strDate != undefined) {
            var dateArray = strDate.split('.');
            var returnDate = dateArray[2] + dateArray[1] + dateArray[0];
            return returnDate;
        }
    }

    function getBase64Image(img) {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        //var dataURL = canvas.toDataURL("image/jpg");

        //var returnUrl = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

        var image = new image();
        image.src = canvas.toDataURL("image/png");
        $("#divImageHolder").appendChild(image);
        // return image;
    }

    function CheckEmptyValue(value) {
        if (value == "" || value == null || value == "NA") {
            return '';
        } else {
            return value;
        }
    }

    function showBusyInd() {
        $(".loader").show();
        $(".loader_block").show();
    }

    function hideBusyInd() {
        $(".loader").hide();
        $(".loader_block").hide();
    }

    function panImageUpload() {

        $.ajax({
            type: "POST",
            url: ServURL + "RetrivePanFiles",
            //data: JSON.stringify(objPerson),
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            // crossDomain: true,       
            statusCode: {
                0: function (data) {
                    alert("Network Error");
                },
                4: function (data) {
                    alert(data);
                },
                200: function (data) {
                    var imgDetails = JSON.parse(data.RetrivePanFilesResult);
                    var dataURL = "data:image/jpeg;base64," + imgDetails.softCopy;
                    $("#divImageHolder").append('<img '
                           + 'src="' + dataURL + '"/>');
                },
                400: function (data) {
                    alert("Bad Request");
                },
                404: function (data) {
                    aler("404 error/File Not Found");
                },
                405: function (data) {
                    alert("405 error");
                }
            }

        });

    }

    function ConvertToPassDate(strDate) {
        if (strDate != undefined) {
            var dateArray = strDate.split('.');
            var returnDate = dateArray[0] + '.' + dateArray[1] + '.' + dateArray[2];
            return returnDate;
        }
    }

    function fncValidateMsg(strText) {
        if (strText.indexOf("country") > -1) {
            $("#ddlPDTstate").empty();
        }
        $("html, body").css("overflow", "hidden");
        $('#divalrt2').html(strText);
        $('.popup_main2').fadeIn();
        $('.over_ley').fadeIn();
        $('.no_btn2').hide();
        $('#btnPopupOK').show();
        $('input[name=Nominee]').attr("disabled", true);
        window.setTimeout(function () {
            $('input[name=Nominee]').attr("disabled", false);
            $('.popup_main2').fadeOut();
            $("html, body").css("overflow", "auto");
            $('.over_ley').fadeOut();
        }, 3000);
    }


    function process(date) {
        if (date != "") {
            var parts = date.split(".");

            return new Date(parts[2], parts[1] - 1, parts[0]);
        } else {
            return date;
        }
    }

    function validate(key) {
        var keycode = (key.which) ? key.which : key.keyCode;
        if ((keycode >= 65 && keycode <= 90) || (keycode >= 97 && keycode <= 122) || keycode == 32) {
            return true;
        } else {
            return false;
        }
    }

    function validateSplChars(key) {
        var keycode = (key.which) ? key.which : key.keyCode;
        if ((keycode >= 65 && keycode <= 90) || (keycode >= 97 && keycode <= 122) || keycode == 32 || (keycode >= 48 && keycode <= 57)) {
            return true;
        } else {
            return false;
        }
    }

    /****************************** Validation/Alert Function Ends ***************************/

/********************* Home Screen/On Load Calling Functions Starts ************************/

    function HomePageBinding(data) {
        finalHomedata = new Array();

        if (data.GetHomePageDataResult.indexOf("An error Occurred while fetching Home Page Details") > -1) {
            fncAlert(data.GetHomePageDataResult.toString());
        }
        if (data.GetHomePageDataResult.indexOf("SessionExpired") > -1) {
            fncAlert("Session expired please login again");
        }
        else {
            var Homedata = data.GetHomePageDataResult;
            finalHomedata = JSON.parse(Homedata);

            

            var Homearray = JSON.parse(finalHomedata["HomePageData"]);

            var PANnumbr = new Array();
            if (finalHomedata["PANDetails"] != "")
                PANnumbr = JSON.parse(JSON.parse(finalHomedata["PANDetails"])["jasonResultSet"]);
 
            if (finalHomedata["BANKTAB"] != undefined)
                flgBnkTab = finalHomedata["BANKTAB"];
            if (finalHomedata["BANKEDIT"] != undefined)
                flgBnkEdit = finalHomedata["BANKEDIT"];
            if (finalHomedata["BANKCOUNT_E"] != undefined)
                flgBnkCntE = finalHomedata["BANKCOUNT_E"];
            if (finalHomedata["BANKCOUNT_S"] != undefined)
                flgBnkCntS = finalHomedata["BANKCOUNT_S"];
            if (finalHomedata["BANKBLKMSG"] != undefined)
                flgBnkBlkMsg = finalHomedata["BANKBLKMSG"];
            if (finalHomedata["BANKBLOCK"] != undefined)
                flgBnkBlk = finalHomedata["BANKBLOCK"];

            if (Homearray["PRV_LAND1"] != undefined) {
                
                flgBnkPrevCoun = Homearray["PRV_LAND1"];
                flgBnkPrevCounName = Homearray["PRV_LANDX"];
            }

            flgWRegion = Homearray["ACTION"];

            //For Asean Benefits
            strBenflg = finalHomedata["myBstrflg"];
            if (strBenflg == "Y") {
                TurBenFlg = finalHomedata["TurkFlg"];
                MalaBenFlg = finalHomedata["MalasFlg"];
                SingBenFlg = finalHomedata["SingpFlg"];
                PhilBenFlg = finalHomedata["PhillipinsFlg"];
            }
            if (Homearray["US_ST_H1V"] != undefined) {
                flgH1BVisa = Homearray["US_ST_H1V"].toString();

                if (Homearray["FTR_LAND1"].toUpperCase() == "US" && flgH1BVisa == "X" && Homearray["ACTION"].toUpperCase() == "OFFSHORE") {
                    flgH1BVisa = "T";
                }
            }
            flgCountry = Homearray["H_LAND"].toString();
            if (flgCountry.toUpperCase() == "USA" ||  Homearray["LAND1"].toUpperCase()=="US")
            {
            $(".sm_aapB").css("display", "block");
            }

            $("#liAcadamc").text(Homearray["ATEXT"]);

            $("#liSuprnme").text(Homearray["SUP_ENAME"]);

            $("#spnSuprdesg").text(Homearray["SUP_DESIGNATION"]);

            $("#spnSupremlID").text(Homearray["SUP_EMAIL_ID"]);

            $("#spnDOB").text("DOB: " + fncdate(Homearray["GBDAT"]));
            if (finalHomedata["PANDetails"] != "")
                $("#spnPAN").text("PAN No: " + PANnumbr["pan"]);

            $("#spnProjNme").text(Homearray["PROJ_NAME"]);

            $("#spnProjStrtDte").text("Start Date: " + fncdate(Homearray["PROJ_START_DATE"]));

            $("#spnProjEndDte").text("End Date: " + fncdate(Homearray["PROJ_END_DATE"]));

            $("#spnPasprtNO").text("Passport No: " + Homearray["DOCN1"]);

            $("#spnDteIssue").text("Date of Issue: " + fncdate(Homearray["DATE1"]));

            $("#spnDteExpry").text("Date of Expiry: " + fncdate(Homearray["EXPID"]));

            searchkeyvalue = finalHomedata["searchKey"];

    }


}

    function hideTabsOnLoad() {
        $(".sm_office_O").hide();
        $(".personal_img_P").hide();
        $(".sm_official_O").hide();
        $(".sm_education_E").hide();
        $(".sm_assignment_B").hide();
        $(".travel_img_T").hide();
        $(".sm_resume_R").hide();
        $(".sm_psp_P").hide();
        $(".sm_aapB").hide();
        $(".sm_bankB").hide();//Onsite
        $(".smB").hide();
    }
    function HomePageMyoffceBinding(data) {

        var HomeOffdata = data.MO_CallWCFResult;
        var finalOfficeHomedata = JSON.parse(HomeOffdata);
        //searchkeyvalue = "office";
        if (searchkeyvalue != "")
            Searchkey(searchkeyvalue.toLowerCase(), flgWRegion);
        Wregion(flgWRegion);
        WGregion(flgWRegion);
        $("#liOffLoc").text(finalOfficeHomedata[0]["OfficeName"]);
        $("#spnOffTwr").text(finalOfficeHomedata[0]["TowerName"]);
        $("#spnOffWng").text(finalOfficeHomedata[0]["WingName"]);
        $("#spnOffFlr").text(finalOfficeHomedata[0]["FloorName"]);
        $("#spnOffSeat").text("Seat No: " + finalOfficeHomedata[0]["SeatNumber"]);
    }

    function ResetGlblValues()
    {
        empObj = new Object();
        masterobj = new Object();
        MasterListArray = new Array();
        FamilyMemberListArray = new Array();
        PersonalArray = new Array();
        master = new Array();
        masterCountry = new Array();
        masterCountryCode = new Array();
        finalHomedata = new Array();
        EditDesgResult = new Array();
        airlinesMasterData = new Array();
        projectAssgnDetailGlobal = new Array();
        primaryBUGlobal = new Array();
        onsiteGlobal = new Array();
        PANEdit = "";
        PAN = new Array();
        NewPANArray = new Array();
        newPAN = "";
        sessionExpired = "SessionExpired";

        ChildCnt = "0";
        AddressIndex = "";

        PANNationalityIndian = 0;

        //variables added for PF
        flgAdditional = "N";
        flgSpouse = "N";
        fatherChk = "";//flag used to auto populate and redirection
        motherChk = "";//flag used to auto populate and redirection
        spouseChk = "";//flag used to auto populate and redirection
        PFNominationChk = "N";
        locationChk = "";
        nmRel = "";

        nmName = "";
        nmDOB = "";
        nmShare = "";
        fatherName = "";
        motherName = "";
        spouseName = "";
        fatherDOB = "";
        motherDOB = "";
        spouseDOB = "";
        FCntr = 0;
        flgRdirect = "";

        Spouse = "";
        Mother = "";
        Father = "";

        flgSpousePass = "";
        flgChildPass = "";

        flgWorkCountry = "";
        flgNationality = "";
        flgeditEnable = 0;

        flgBnkTab = "";
        flgBnkEdit = "";
        flgBnkCntS = "";
        flgBnkCntE = "";
        flgBnkBlkMsg = "";
        flgBnkBlk = "";
        flgBnkPrevCoun = "";
        flgWRegion = "";

        //Turkey Implementation
        strBenflg = "";
        TurBenFlg = "";
        MalaBenFlg = "";
        SingBenFlg = "";
        PhilBenFlg = "";

        TrID = "";
        TrDoc = "";
        flgAdd = "0";


        chdflg = 0;
        dpndflg = 0;
        emraddrssflg = 0;
        AlertMsg = "";
        ReloadMyWpro = 0;
        $("hdnLandx_Code").val("");
        $("hdnNatio_Code").val("");
    }

    function DataLoadFunction() {
        //Ajax Call For Getting Employee details
        ResetGlblValues();
        $.ajax({
            type: "POST",
            url: ServURL + "GetEmployeeDetails",
            //data: JSON.stringify(parameter2),
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            statusCode: {

                200: function (data) {
                    if (data.GetEmployeeDetailsResult.strRetmsg == sessionExpired) {
                        fncAlert("Session expired please login again.");
                    } else {
                        EmployeeDetails(data);
                    }
                },
                400: function (data) {
                    fncAlert("Bad request.");
                },
                404: function (data) {
                    fncAlert("404 error.");
                },
                405: function (data) {
                    fncAlert("405 error.");
                }
            }
        });

        //AJAX call for getting Master list details

        $.ajax({
            type: "POST",
            url: ServURL + "GetMasterList",

            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            statusCode: {
                200: function (data) {
                    MasterListDetails(data);
                },
                400: function (data) {
                    fncAlert("Bad request.");
                },
                404: function (data) {
                    fncAlert("404 error.");
                },
                405: function (data) {
                    fncAlert("405 error.");
                }
            }
        });

        //AJAX call for getting Master family member list

        $.ajax({
            type: "POST",
            url: ServURL + "GetFamilyMemberList",

            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            statusCode: {

                200: function (data) {
                    MasterFamilyMemberList(data);
                },
                400: function (data) {
                    fncAlert("Bad request.");
                },
                404: function (data) {
                    fncAlert("404 error.");
                },
                405: function (data) {
                    fncAlert("405 error.");
                }
            }
        });

        
       
       AjaxCallforHomePage(); 

        var adata = { "MethodName": "GetEmployeeDetailsForMyOffice", "Parameters": "", "EmployeeID": "" };
        var dataJsonString = JSON.stringify(adata);

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: MO_URL,
            data: dataJsonString,
            dataType: "json",
            crossDomain: true,
            statusCode: {

                200: function (data) {
                    HomePageMyoffceBinding(data);
                },
                400: function (data) {
                    fncAlert("Bad request.");
                },
                404: function (data) {
                    fncAlert("404 error.");
                },
                405: function (data) {
                    fncAlert("405 error.");
                }
            }

        });

    }

function Searchkey(searchkeyval, Offhoreonsite) {
    //var str = document.cookie;//"portal=xWfS88bynJs=; findAppFlag=Y; searchKey=MY DATA"
    //var stv = str.split(';')
    //for (i = 0; i < stv; 1++) {
    //if (stv[i].indexOf("searchKey") > -1) {
    //var searchkeyval = stv[2].split('=')[1].toLowerCase();        
    //if (Offhoreonsite.toUpperCase() == "OFFSHORE") {
    $('#Li7').css("display", "none");
    $('#Li8').css("display", "none");
    $("#sm_bank").show();
    //}
    if ((searchkeyval.indexOf("personal staffing page") > -1) || (searchkeyval.indexOf("personalstaffingpage") > -1) || (searchkeyval.indexOf("psp") > -1) || (searchkeyval.indexOf("staffing page") > -1) || (searchkeyval.indexOf("personal staffing page(psp)") > -1)) {
        searchkeyval = "";
        var href = $('.PSP_link').attr('href');
        window.location.href = href;
    }
    else if ((searchkeyval.indexOf("bank details") > -1) || (searchkeyval.indexOf("bankdetails") > -1) || (searchkeyval.indexOf("bank") > -1) || (searchkeyval.indexOf("mybank") > -1) || (searchkeyval.indexOf("my bank") > -1)) {
        searchkeyval = "";
        //if (Offhoreonsite.toUpperCase() == "OFFSHORE") {
        onClickBnk();
        $('.middle_main_home').hide();
        $('.main_rgt').css('display', 'block');
        var index_li = 4;
        $('.web_page ul li a').removeClass('active');
        $('.middle_content').hide();
        $('.web_page ul li').removeClass('active');
        $('.web_page ul li:eq(' + index_li + ')').addClass('active');
        $('.web_page ul li a:eq(' + index_li + ')').addClass('active');
        $('.middle_content:eq(' + index_li + ')').show();
        var height_main = $(".middle_main").height();
        if (height_main > 700) {
            var height_main = $(".middle_main").height();
            $('.sub_sidebarmenu').css('height', height_main);
            $('.main_rgt').css('height', height_main);
        }
        else {
            $('.sub_sidebarmenu').css('height', '654px');
            $('.main_rgt').css('height', '654px');

        }
        // $('#divEdtsalary').show();
        // $('#divEdtreimburse').show();
        //}
        //else {
        //    var href = $('.onsit_bnk').attr('href');
        //    window.open(href);
        //    //window.location.href = href;
        //}
    }
    else if ((searchkeyval.indexOf("my office") > -1) || (searchkeyval.indexOf("office details") > -1) || (searchkeyval.indexOf("office") > -1) || (searchkeyval.indexOf("myspace") > -1) || (searchkeyval.indexOf("space") > -1) || (searchkeyval.indexOf("location details") > -1) || (searchkeyval.indexOf("contact details") > -1) || (searchkeyval.indexOf("contactdetails") > -1)) {
        searchkeyval = "";
        $(".office_click").trigger("click");
    }
    else if ((searchkeyval.indexOf("aap") > -1) || (searchkeyval.indexOf("affirmative") > -1) || (searchkeyval.indexOf("affirmative action plan") > -1) || (searchkeyval.indexOf("affirmative action") > -1) || (searchkeyval.indexOf("affirmativeactionplan") > -1)) {
        searchkeyval = "";
        if (flgCountry.toUpperCase() == "USA") {
            $(".sm_aapB").trigger("click");
        }
    }

    else if ((searchkeyval.indexOf("personal") > -1) || (searchkeyval.indexOf("myinformation") > -1) || (searchkeyval.indexOf("emergency contacts") > -1) || (searchkeyval.indexOf("personal details") > -1) || (searchkeyval.indexOf("personaldetails") > -1) || (searchkeyval.indexOf("personal") > -1) || (searchkeyval.indexOf("my personal details") > -1) || (searchkeyval.indexOf("personal information") > -1) || (searchkeyval.indexOf("contact address") > -1)) {
        searchkeyval = "";
        $(".personal_img_P").trigger("click");
    }
    else if ((searchkeyval.indexOf("organizational structure") > -1) || (searchkeyval.indexOf("hr details") > -1) || (searchkeyval.indexOf("official") > -1) || (searchkeyval.indexOf("official details") > -1) || (searchkeyval.indexOf("officialdetails") > -1) || (searchkeyval.indexOf("myofficial") > -1) || (searchkeyval.indexOf("official information") > -1)) {
        searchkeyval = "";
        $(".sm_official").trigger("click");

    }
    else if ((searchkeyval.indexOf("education") > -1) || (searchkeyval.indexOf("myeducation") > -1) || (searchkeyval.indexOf("educationdetails") > -1) || (searchkeyval.indexOf("myeducation") > -1) || (searchkeyval.indexOf("educationdetails") > -1) || (searchkeyval.indexOf("academic") > -1) || (searchkeyval.indexOf("qualifications") > -1)) {
        searchkeyval = "";
        $(".sm_education_E").trigger("click");
    }

    else if ((searchkeyval.indexOf("passport") > -1) || (searchkeyval.indexOf("update passport details") > -1) || (searchkeyval.indexOf("travel profile") > -1) || (searchkeyval.indexOf("travelprofile") > -1) || (searchkeyval.indexOf("mytravelprofile") > -1) || (searchkeyval.indexOf("mytraveldetails") > -1)) {
        searchkeyval = "";
        $('.travel_img_T').trigger("click");
    }
    else if ((searchkeyval.indexOf("family") > -1) || (searchkeyval.indexOf("family details") > -1) || (searchkeyval.indexOf("familydetails") > -1) || (searchkeyval.indexOf("family") > -1) || (searchkeyval.indexOf("myfamily") > -1)) {
        searchkeyval = "";
        //$('.personal_family_add').trigger("click");
        $(".personal_img_P").trigger("click");
    }
    //}
    //}
}

    function AjaxCallforHomePage() {
        //Ajax Call For Home page binding

        $.ajax({
            type: "POST",
            url: ServURL + "GetHomePageData",
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            statusCode: {

                200: function (data) {
                    HomePageBinding(data);                       
                },
                400: function (data) {
                    fncAlert("Bad request.");
                },
                404: function (data) {
                    fncAlert("404 error.");
                },
                405: function (data) {
                    fncAlert("405 error.");
                }
            }
        });
    }

    function MasterListDetails(MasterListData) {

        masterCountryCode = new Array();
        MasterListArray = new Array();
        MasterListArray = JSON.parse(MasterListData.GetMasterListResult);


        //---------------FOR my INFO edit mode-------------

        //Blood Group

        var objbldgrp = MasterListArray.Blood_Group;
        $('#ddlPDbldg').empty();

        $.each(objbldgrp, function (j, val) {
            $('#ddlPDbldg').append('<option value="' + objbldgrp[j].WTFLD + '">' + BloodGroup(objbldgrp[j].WTFLD) + '</option>');
        });

        //Nationality
        var tempNatioArr = new Array();
        for (i = 0; i < MasterListArray.Nationality.length; i++) {
            var nationalityPD = new Object();
            nationalityPD.Name = MasterListArray.Nationality[i]["NATIO"];
            nationalityPD.Id = MasterListArray.Nationality[i]["LAND1"];
            tempNatioArr.push(nationalityPD);

            var nationality = MasterListArray.Nationality[i]["NATIO"];

            if (master.indexOf(nationality) == -1) {
                master.push(nationality);
            }
        }
       
        $("#txtPDnatl").autocomplete({
            
            //source: master
            source: function (request, response) {
                var inpText = request.term;
                var natinalityArray = new Array();

                for (i = 0; i < tempNatioArr.length; i++) {
                    if (tempNatioArr[i]["Name"].toUpperCase().indexOf(inpText.toUpperCase()) > -1)
                        natinalityArray.push({ Name: tempNatioArr[i]["Name"], Id: tempNatioArr[i]["Id"] });
                }
                if (natinalityArray.length == 0) {
                    fncValidateMsg("Please enter a valid nationality");
                    $("#txtPDnatl").val('');
                }

                response($.map(eval(natinalityArray), function (item) {
                    return {
                        label: item.Name + "-" + item.Id,
                        vvalue: item.Id
                    }
                }));
            },
            select: function (event, ui) {
                $("#txtPDnatl").val(ui.item.label);
                $("#hdnNatio_Code").val(ui.item.vvalue);
            },
            change: function (event, ui) {
                var res = $("#txtPDnatl").val().split("-");
                var Nationality = res[0];
                if (Nationality != "Indian") {
                    $("#liPDpan").hide();
                    $("#liPDupload").hide();
                    $("#liPDRjctnReasn").hide();
                    $("#liPDdwnld").hide();
                    PANNationalityIndian = 0;

                }
                else {
                    $("#liPDpan").show();
                    $("#liPDupload").show();
                    $("#liPDRjctnReasn").show();
                    $("#liPDdwnld").show();
                    PANNationalityIndian = 1;

                }

            }
        });


        //Citizenship

        for (i = 0; i < MasterListArray.Nationality.length; i++) {

            var Citizenship = MasterListArray.Nationality[i]["LANDX"];
            masterCountry.push(Citizenship);

        }

        $("#txtPDctzn1").autocomplete({
            //source: masterCountry
            source: function (request, response) {
                var inpText = request.term;

                var masterCountryArray = new Array();

                for (i = 0; i < masterCountry.length; i++) {
                    if (masterCountry[i].toUpperCase().indexOf(inpText.toUpperCase()) > -1)
                        masterCountryArray.push(masterCountry[i]);
                }

                if (masterCountryArray.length == 0) {
                    fncValidateMsg("Please enter a valid citizenship");
                    $("#txtPDctzn1").val('');
                }
                response($.map(eval(masterCountryArray), function (item) {
                    return {
                        label: item,
                        vvalue: item
                    }
                }));
            }

        });

        $("#txtFTNatio").autocomplete({
            //source: master

            source: function (request, response) {
                var inpText = request.term;

                var natinalityArray = new Array();

                for (i = 0; i < master.length; i++) {
                    if (master[i].toUpperCase().indexOf(inpText.toUpperCase()) > -1)
                        natinalityArray.push(master[i]);
                }

                if (natinalityArray.length == 0) {
                    fncValidateMsg("Please enter a valid nationality");
                    $("#txtPDspsntn").val('');
                }
                response($.map(eval(natinalityArray), function (item) {
                    return {
                        label: item,
                        vvalue: item
                    }
                }));
            }
        });

        $("#txtFTNation").autocomplete({
            //source: master

            source: function (request, response) {
                var inpText = request.term;

                var natinalityArray = new Array();

                for (i = 0; i < master.length; i++) {
                    if (master[i].toUpperCase().indexOf(inpText.toUpperCase()) > -1)
                        natinalityArray.push(master[i]);
                }

                if (natinalityArray.length == 0) {
                    fncValidateMsg("Please enter a valid nationality");
                    $("#txtPDspsntn").val('');
                }
                response($.map(eval(natinalityArray), function (item) {
                    return {
                        label: item,
                        vvalue: item
                    }
                }));
            }
        });

        //Martial Status

        var objmarsts = MasterListArray.Marital_Status;
        $('#ddlPDmarsts').empty();
        $.each(objmarsts, function (j, val) {
            $('#ddlPDmarsts').append('<option value="' + objmarsts[j].FTEXT + '">' + MartialStatus(objmarsts[j].FTEXT) + '</option>');
        });

        //-------------------FOR my family EDIT mode ---------

        //Gender

        var objgndr = MasterListArray.Gender_Key;


        $('#ddlPDspsgndr').empty();

        $.each(objgndr, function (j, val) {
            $('#ddlPDspsgndr').append('<option value="' + objgndr[j].STEXT + '">' + objgndr[j].STEXT + '</option>');
        });

        //Nationality

        $("#txtPDspsntn").autocomplete({
            //source: master

            source: function (request, response) {
                var inpText = request.term;

                var natinalityArray = new Array();

                for (i = 0; i < master.length; i++) {
                    if (master[i].toUpperCase().indexOf(inpText.toUpperCase()) > -1)
                        natinalityArray.push(master[i]);
                }

                if (natinalityArray.length == 0) {
                    fncValidateMsg("Please enter a valid nationality");
                    $("#txtPDspsntn").val('');
                }
                response($.map(eval(natinalityArray), function (item) {
                    return {
                        label: item,
                        vvalue: item
                    }
                }));
            }
        });

    }

    function MasterFamilyMemberList(FamilyMemberList) {

        FamilyMemberListArray = JSON.parse(FamilyMemberList.GetFamilyMemberListResult);

    }

    /********************* Home Screen/On Load Calling Functions Ends ************************/

    /***********************************Resume Section Starts *******************************/

    function AjaxResume() {
        $('.UCFdv').css("display", "none");
        $('#divRDucf').css("display", "none");
        $('.upscaledv').css("display", "none");
        $('#divRDclustr').css("display", "none");
        //Ajax Call For getting Resume details
        showBusyInd();
        $.ajax({
            type: "POST",
            url: ServURL + "GetResumeDetails",
            //data: JSON.stringify(resumepar),
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            statusCode: {

                200: function (data) {
                    if (data.GetResumeDetailsResult == sessionExpired) {
                        hideBusyInd();
                        fncAlert("Session expired please login again.");
                    } else {
                        ResumeDetails(data);
                        hideBusyInd();
                    }
                },
                400: function (data) {
                    fncAlert("Bad request.");
                    hideBusyInd();
                },
                404: function (data) {
                    fncAlert("404 error.");
                    hideBusyInd();
                },
                405: function (data) {
                    fncAlert("405 error.");
                    hideBusyInd();
                }
            }
        });

        //Ajax Call For getting UCF & Cluster Training details
        showBusyInd();
        $.ajax({
            type: "POST",
            url: ServURL + "GetUCFDetails",
            //data: JSON.stringify(resumepar),
            processData: false,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            statusCode: {

                200: function (data) {
                    UCFDetails(data);
                    hideBusyInd();
                },
                400: function (data) {
                    alert("Bad Request");
                    hideBusyInd();
                },
                404: function (data) {
                    alert("404 error");
                    hideBusyInd();
                },
                405: function (data) {
                    alert("405 error");
                    hideBusyInd();
                }
            }
        });
    }

    function ResumeDetails(ResumeData) {

        var ResumeArray = new Array();
        ResumeArray = JSON.parse(ResumeData.GetResumeDetailsResult);
        $("#tbRESskls").empty();
        //----------binding Project Skills--------

        for (i = 0; i < ResumeArray.EmployeeDetails.ProjectSkills.length; i++) {
            if (ResumeArray.EmployeeDetails.ProjectSkills[i]["SKILL_TEXT"] != undefined) {
                $("#tbRESskls").append('<tr>'
                                            + '   <td class="tbl_brdr" id="tdRESskls">' + ResumeArray.EmployeeDetails.ProjectSkills[i]["SKILL_TEXT"] + '</td>'
                                                + '<td class="tbl_brdr" id="tdRESdur">' + ResumeArray.EmployeeDetails.ProjectSkills[i]["DURATION"] + '' + " Months" + '</td>'
                                                + '<td class="tbl_brdr" id="tdRESprlvl">' + CheckEmptyVal(ResumeArray.EmployeeDetails.ProjectSkills[i]["PFLEVEL"]) + '</td>'
                                                + '<td>Project Aquired</td>'
                                            + '</tr>'

                                      );
            }
        }

        //------------binding Domain skills-------

        for (i = 0; i < ResumeArray.EmployeeDetails.ProjectDomainSkill.length; i++) {
            if (ResumeArray.EmployeeDetails.ProjectDomainSkill[i]["SKILL_TEXT"] != undefined) {
                $("#tbRESskls").append('<tr>'
                                            + '   <td class="tbl_brdr" id="tdRESskls">' + ResumeArray.EmployeeDetails.ProjectDomainSkill[i]["SKILL_TEXT"] + '</td>'
                                                + '<td class="tbl_brdr" id="tdRESdur">' + ResumeArray.EmployeeDetails.ProjectDomainSkill[i]["DURATION"] + '' + " Months" + '</td>'
                                                + '<td class="tbl_brdr" id="tdRESprlvl">' + CheckEmptyVal(ResumeArray.EmployeeDetails.ProjectDomainSkill[i]["PFLEVEL"]) + '</td>'
                                                + '<td>Domain</td>'
                                            + '</tr>'

                                      );
            }
        }

        //----------binding Trained Skills------

        for (i = 0; i < ResumeArray.EmployeeDetails.EmployeeTrainingSkills.length; i++) {
            if (ResumeArray.EmployeeDetails.EmployeeTrainingSkills[i]["SKILL"] != undefined) {

                $("#tbRESskls").append('<tr>'
                                            + '   <td class="tbl_brdr" id="tdRESskls">' + ResumeArray.EmployeeDetails.EmployeeTrainingSkills[i]["SKILL"] + '</td>'
                                                + '<td class="tbl_brdr" id="tdRESdur">NA</td>'
                                                + '<td class="tbl_brdr" id="tdRESprlvl">' + CheckEmptyVal(ResumeArray.EmployeeDetails.EmployeeTrainingSkills[i]["ZLEVEL"]) + '</td>'
                                                + '<td>Training</td>'
                                            + '</tr>'

                                      );
            }
        }

        //---------binding Language skills-------

        for (i = 0; i < ResumeArray.EmployeeDetails.LanguageDetails.length; i++) {
            if (ResumeArray.EmployeeDetails.LanguageDetails[i]["LANGUAGE"] != undefined) {
                $("#tbRESskls").append('<tr>'
                                            + '   <td class="tbl_brdr" id="tdRESskls">' + CheckEmptyVal(ResumeArray.EmployeeDetails.LanguageDetails[i]["LANGUAGE"]) + '</td>'
                                                + '<td class="tbl_brdr" id="tdRESdur">NA</td>'
                                                + '<td class="tbl_brdr" id="tdRESprlvl">' + CheckEmptyVal(ResumeArray.EmployeeDetails.LanguageDetails[i]["PROF_LEVEL"]) + '</td>'
                                                + '<td>Language</td>'
                                            + '</tr>'

                                      );
            }
        }

        //---------binding Certified Skills ---------------

        for (i = 0; i < ResumeArray.EmployeeDetails.EmployeeCertifictionSkills.length; i++) {
            if (ResumeArray.EmployeeDetails.EmployeeCertifictionSkills[i]["SKILL"] != undefined) {


                var Certification = ResumeArray.EmployeeDetails.EmployeeCertifictionSkills[i]["SKILL"];
                var CertificationSplt = Certification.split(",");

                for (j = 0; j < CertificationSplt.length; j++) {

                    var Certified = CertificationSplt[j];
                    var FinalCertified = Certified.split("(");

                    var skill = FinalCertified[0];
                    var level = FinalCertified[1].replace(")", "");


                    $("#tbRESskls").append('<tr>'
                                            + '   <td class="tbl_brdr" id="tdRESskls">' + skill + '</td>'
                                                + '<td class="tbl_brdr" id="tdRESdur">NA</td>'
                                                + '<td class="tbl_brdr" id="tdRESprlvl">' + level + '</td>'
                                                + '<td>Certified</td>'
                                            + '</tr>'

                                      );

                }
            }
        }

        //------------binding Experience details-------

        if (ResumeArray.EmployeeDetails.Experience.PreviousExperiance["EXPYR"] == undefined || ResumeArray.EmployeeDetails.Experience.PreviousExperiance["EXPMT"] == undefined) {
            $("#lblRDothrexp").text("NA");
        }
        else {
            $("#lblRDothrexp").text(ResumeArray.EmployeeDetails.Experience.PreviousExperiance["EXPYR"] + " " + "Years" + " " + ResumeArray.EmployeeDetails.Experience.PreviousExperiance["EXPMT"] + " " + "Months");
        }

        if (ResumeArray.EmployeeDetails.Experience.WiproExperiance["EXPYR"] == undefined || ResumeArray.EmployeeDetails.Experience.WiproExperiance["EXPMT"] == undefined) {
            $("#lblRDwproexp").text("NA");
        }
        else {
            $("#lblRDwproexp").text(ResumeArray.EmployeeDetails.Experience.WiproExperiance["EXPYR"] + " " + "Years" + " " + ResumeArray.EmployeeDetails.Experience.WiproExperiance["EXPMT"] + " " + "Months");
        }


    }

    function UCFDetails(UCFData) {

        var UCFArray = new Array();
        UCFArray = JSON.parse(UCFData.GetUCFDetailsResult);

        var FinalUCFArray = new Array();
        var FinalClusterArray = new Array();


        //-----binding UCF details-------------------
        $("#divRDucf").empty();
        FinalUCFArray = UCFArray.PSPEmpUCFTargetAndClusterDetails.EmployeeUcfTargetDetails;
        FinalClusterArray = UCFArray.PSPEmpUCFTargetAndClusterDetails.PSPEmployeeClusterDetails.EmployeeClusterDetails;

        if (FinalUCFArray.length > 0) {

            if (JSON.stringify(FinalUCFArray[0]) != "{}") {
                $('.UCFdv').css("display", "block");
                $('#divRDucf').css("display", "block");

                for (i = 0; i < FinalUCFArray.length; i++) {

                    $("#divRDucf").append('<div class="content_office border_btm" ><ul class="official_ul"><li class="field"><div class="field_name">financial year</div>'

                + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalUCFArray[i]["FY_YEAR_MAP"]) + '</label></li>'

                + '<li class="field"><div class="field_name">assessment id</div>'

                 + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalUCFArray[i]["ASSESSMENT_1_ID"]) + '</label></li>'


                + '<li class="field"><div class="field_name">assessment name</div>'

                + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalUCFArray[i]["ASSESSMENT1_NAME1"]) + '</label></li>'


                + '<li class="field"><div class="field_name">level</div>'

                + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalUCFArray[i]["UCF_LEVEL_TEXT1"]) + '</label></li>'

                + '<li class="field"><div class="field_name">target date</div>'

                + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalUCFArray[i]["TARGET_1_DATE"]) + '</label></li></ul></div>'

              );
                }
            }
            else {
                $('.UCFdv').css("display", "none");
                $('#divRDucf').css("display", "none");
                $("#divRDucf").append('<div class="content_office border_btm" ><ul class="official_ul"><li class="field"><div>No,UCF records to show.</div></li></ul></div>');
            }
        }

        else {
            $('.UCFdv').css("display", "none");
            $('#divRDucf').css("display", "none");
            $("#divRDucf").append('<div class="content_office border_btm" ><ul class="official_ul"><li class="field"><div>No,UCF records to show.</div></li></ul></div>');
        }

        //-----------------------binding UPSCALE details-----------------------------------------

        $("#divRDclustr").empty();
        if (FinalClusterArray.length > 0) {

            if (JSON.stringify(FinalClusterArray[0]) != "{}") {
                $('.upscaledv').css("display", "block");
                $('#divRDclustr').css("display", "block");

                for (i = 0; i < FinalClusterArray.length; i++) {

                    $("#divRDclustr").append('<div class="content_office border_btm" ><ul class="official_ul"><li class="field"><div class="field_name">financial year</div>'

                + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalClusterArray[i]["FY_YEAR"]) + '</label></li>'

                + '<li class="field"><div class="field_name">assessment id</div>'

                 + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalClusterArray[i]["ASSESSMENT_ID"]) + '</label></li>'


                + '<li class="field"><div class="field_name">assessment name</div>'

                + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalClusterArray[i]["ASSESSMENT_NAME"]) + '</label></li>'


                + '<li class="field"><div class="field_name">level</div>'

                + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalClusterArray[i]["CLUSTER_LEVEL"]) + '</label></li>'

                + '<li class="field"><div class="field_name">target date</div>'

                + '<label data-role="none" class="salry_nonedit">' + CheckEmptyVal(FinalClusterArray[i]["TARGET_DATE"]) + '</label></li></ul></div>'

              );

                }
            }
            else {
                $('.upscaledv').css("display", "none");
                $('#divRDclustr').css("display", "none");
                $("#divRDclustr").append('<div class="content_office border_btm" ><ul class="official_ul"><li class="field"><div>No,upscale training records to show.</div></li></ul></div>');
            }
        }

        else {
            $('.upscaledv').css("display", "none");
            $('#divRDclustr').css("display", "none");
            $("#divRDclustr").append('<div class="content_office border_btm" ><ul class="official_ul"><li class="field"><div>No,upscale training records to show.</div></li></ul></div>');
        }

    }

/***********************************Resume Section Ends *******************************/

/***********************************AAP Section Starts *******************************/

    var sapDate = "";
    var userId = "";
    var radioVal = null, radioValArray = [], checkedValues = [];//,checkedObj = new Object();
    var checkedObject = null;
    var radioObject = null;

    function fncAppSubmit() {
        if ($("#ddlDisabilityStatus").is(':visible') == true && $("#ddlDisabilityStatus").val() == "BD") {
            fncAlert("Please select Disability Status");
            return false;
        }
        radioValArray = [];
        radioValArray.push(radioObject);
        if (radioValArray.length > 0 && radioValArray != undefined && checkedValues.length > 0 && $('.SID').is(':checked')&& $('.SIR').is(':checked')) {
            var dataval = JSON.stringify({ "inputRaceJsonArray": JSON.stringify(radioValArray), "inputVeteranJsonArray": JSON.stringify(checkedValues) });
            $("#app_Submit").css("display", "none");
            showBusyInd();
            $.ajax({
                type: "POST",
                url: ServURL + "SubmitAAP",
                data: dataval,
                processData: false,
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                statusCode: {
                    200: function (data) {
                        hideBusyInd();
                        fncAlert(data.SubmitAAPResult);
                        if (data.SubmitAAPResult.indexOf("uccessfully") > -1) {
                            $("#app_Submit").css("display", "none");
                        }
                        else {
                            $("#app_Submit").css("display", "block");
                        }
                        if (data.SubmitAAPResult.indexOf("required") > -1) {
                            ResetAAPvalues();
                        }
                    },
                    400: function (data) {
                        fncAlert("Bad request.");
                        hideBusyInd();
                    },
                    404: function (data) {
                        fncAlert("404 error.");
                        hideBusyInd();
                    },
                    405: function (data) {
                        fncAlert("405 error.");
                        hideBusyInd();
                    }
                }

            });

        }
        else
            fncAlert("Please select respective options");
    }
    function ResetAAPvalues() {
        radioVal = null, radioValArray = [], checkedValues = [];//,checkedObj = new Object();
        checkedObject = null;
        radioObject = null;
        $("#app_Submit").css("display", "block");
        var status = false;
        var eleNodelist = document.getElementsByName('aa');
        for (i = 0; i < eleNodelist.length; i++) {
            if (eleNodelist[i].type == 'radio' || eleNodelist[i].type == 'checkbox')
                if (status == null) {
                    eleNodelist[i].checked = !eleNodelist[i].checked;
                }
                else eleNodelist[i].checked = status;
        }
        var eleNodelist = document.getElementsByName('ds');
        for (i = 0; i < eleNodelist.length; i++) {
            if (eleNodelist[i].type == 'radio' || eleNodelist[i].type == 'checkbox')
                if (status == null) {
                    eleNodelist[i].checked = !eleNodelist[i].checked;
                }
                else eleNodelist[i].checked = status;
        }
        $("#spnDisabilityStatus").hide();
        $("#ddlDisabilityStatus").val("BD");
        $('#DN').removeAttr("disabled");
        $('#SD').removeAttr("disabled");
        $('#VE').removeAttr("disabled");
        $('#OT').removeAttr("disabled");
        $('#NV').removeAttr("disabled");
    }

function BindDataAAP() {

        ResetAAPvalues();
        radioValArray = [], checkedValues = [];
        var today = new Date();
        //alert(today.getFullYear()+" : "+(today.getMonth()+1) + " : "+today.getDate());
        var dateObj = new Object();
        dateObj.year = today.getFullYear();
        dateObj.month = today.getMonth() + 1;
        dateObj.day = today.getDate();
        sapDate = null;
        if (dateObj.month > 9) {
            sapDate = dateObj.year + "" + dateObj.month + "" + dateObj.day;
        } else {
            sapDate = dateObj.year + "0" + dateObj.month + "" + dateObj.day;
        }
        $("#ddlDisabilityStatus").change(function () {
            $("#app_Submit").css("display", "block");
        });
        $('.SIR').click(function () {
            $("#app_Submit").css("display", "block");
            if ($(this).prop("checked") == true) {
                radioVal = $(this).attr('id');
                radioObject = new Object();
                radioObject.PERNR = "EmpNo01";
                radioObject.ENDDA = "99991231";
                radioObject.BEGDA = sapDate;
                radioObject.ZZETHNTY = radioVal;
                radioObject.AEDTM = sapDate;
                radioObject.UNAME = "EmpADo01";
            }
        });

        $('.SID').click(function () {
            $("#app_Submit").css("display", "block");
            if ($(this).prop("checked") == true) {
                $this = $(this).attr('id');
                if ($this === "DT") {
                    $("#spnDisabilityStatus").show();
                    $("#ddlDisabilityStatus").click(function () {
                        radioObject.SBGRU = $("#ddlDisabilityStatus").val();
                    });
                }
                else if ($this === "DF") {
                    $("#spnDisabilityStatus").hide();
                    radioObject.SBGRU = "08";
                }
                else if ($this === "NDT") {
                    $("#spnDisabilityStatus").hide();
                    radioObject.SBGRU = "";
                }
            }
        });

        $('input[type="checkbox"]').click(function () {
            checkedValues = [];
            $("#app_Submit").css("display", "block");
            if ($(this).prop("checked") == true) {
                $this = $(this).attr('id');
                //alert("$this ::"+$this);

                if ($this === "NV") {
                    $('#DN').attr("disabled", "true");
                    $('#SD').attr("disabled", "true");
                    $('#VE').attr("disabled", "true");
                    $('#OT').attr("disabled", "true");
                    checkedObject = new Object();
                    checkedObject.PERNR = "EmpNo01";
                    checkedObject.SUBTY = $this;
                    checkedObject.ENDDA = "99991231";
                    checkedObject.BEGDA = sapDate;
                    checkedObject.AEDTM = sapDate;
                    checkedObject.UNAME = "EmpADo01";
                    checkedObject.WDART = $this;
                    checkedValues.push(checkedObject)
                }
                else if ($this === "DN") {
                    $('#NV').attr("disabled", "true");
                    $('#SD').attr("disabled", "true");
                    $('#VE').attr("disabled", "true");
                    $('#OT').attr("disabled", "true");
                    checkedObject = new Object();
                    checkedObject.PERNR = "EmpNo01";
                    checkedObject.SUBTY = $this;
                    checkedObject.ENDDA = "99991231";
                    checkedObject.BEGDA = sapDate;
                    checkedObject.AEDTM = sapDate;
                    checkedObject.UNAME = "EmpADo01";
                    checkedObject.WDART = $this;
                    checkedValues.push(checkedObject)
                }
                else {
                    checkedObject = new Object();
                    $('#SD').removeAttr("disabled");
                    $('#VE').removeAttr("disabled");
                    $('#OT').removeAttr("disabled");
                    $('#DN').attr("disabled", "true");
                    $('#NV').attr("disabled", "true");
                    checkedObject.PERNR = "EmpNo01";
                    checkedObject.SUBTY = $this;
                    checkedObject.ENDDA = "99991231";
                    checkedObject.BEGDA = sapDate;
                    checkedObject.AEDTM = sapDate;
                    checkedObject.UNAME = "EmpADo01";
                    checkedObject.WDART = $this;
                    checkedValues.push(checkedObject);
                }

            }
            else if ($(this).prop("checked") == false) {
                $this = $(this).attr('id');
                checkedValues.splice($.inArray($this, checkedValues), 1);
                if (checkedValues.length == 0 && $this != "DN") {
                    $('#DN').removeAttr("disabled");
                    $('#SD').removeAttr("disabled");
                    $('#VE').removeAttr("disabled");
                    $('#OT').removeAttr("disabled");
                }
                if (checkedValues.length == 0 && $this != "NV") {
                    $('#NV').removeAttr("disabled");
                    $('#SD').removeAttr("disabled");
                    $('#VE').removeAttr("disabled");
                    $('#OT').removeAttr("disabled");
                }
                else {
                    $('#SD').removeAttr("disabled");
                    $('#VE').removeAttr("disabled");
                    $('#OT').removeAttr("disabled");
                }
            }

        });



    }

/***********************************AAP Section Ends *******************************/