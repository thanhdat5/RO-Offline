// Common function
var Common = {
    STUDY_POS: '',
    actType: '001',
    score: 100,
    studyTime: 0,
    speakingInfo: ''
};
var arrTimeout = [];
var allAudioArr = [];
var accept_Act = [];
var temp_Mode = "Extra";

function setList() {
    // Todo
}

function setActType(actTypeId) {
    stopAllTimeout();
    STUDY_POS = actTypeId;
}

function stopAllTimeout() {
    for (let i = 0; i < arrTimeout.length; i++) {
        if (arrTimeout[i]) {
            clearTimeout(arrTimeout[i]);
        }
    }
    arrTimeout = [];
}

function stopAllAudio() {
    for (let j = 0; j < allAudioArr.length; j++) {
        if (allAudioArr[j]) {
            allAudioArr[j].pause();
        }
    }
    allAudioArr = [];
}

// Set complete act type
function setCompleteActType(bookURL) {
    var text1 = "";
    var text2 = "";
    var finishedHtml = "";
    if (Common.actType == "003" || Common.actType == "007" || Common.actType == "008" ||
        Common.actType == "009" || Common.actType == "005" || Common.actType == "004" || Common.actType == "010") //quiz
    {
        if (Common.score < 0) {
            Common.score = 0;
        }
        if (Common.score >= 0 && Common.score <= 40) {
            text1 = "Try Harder.";
            text2 = "Try again.";
        } else if (Common.score > 40 && Common.score <= 60) {
            text1 = "Good job. Try harder.";
            text2 = "Try again.";
        } else if (Common.score > 60 && Common.score <= 80) {
            text1 = "Very good! You are so smart!";
            text2 = "You finished.";
        } else {
            text1 = "Excellent! You are a genius!";
            text2 = "You finished.";
        }
        finishedHtml = '<h3><b>You score : </b><span>' + Common.score + '</span></h3>' +
            '<p>' + text1 + '<br /><br />' + text2 + '</p>';
    } else if (Common.actType == "001" || Common.actType == "006" || Common.actType == "002") {
        finishedHtml = '<h3>You have finished.</h3>' +
            '<p>Click on <strong>"REPLAY"</strong> to play again<br />' +
            'or<br />' +
            'click on the <strong>next activity</strong>.</p>';
    }

    var innerHtml = '<div class="rd-finished-content">' +
        '<div class="rd-finished-left">' +
        '<img src="' + bookURL + '" />' +
        '</div>' +
        '<div class="rd-finished-right">' +
        '<div class="rd-finished-right-content">' + finishedHtml +
        '</div>' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '</div>';

    setTimeout(function() {
        stopAllTimeout();
        stopAllAudio();
        $('#finishedSection').html(innerHtml);
        // Comment code
        hideAllSection();
        $('#finishedSection').show();
        if (temp_Mode === "Basic") {
            $('#finishedSectionAction').show();
        }

        Common.studyTime = Math.ceil((Date.now() - Common.startTime) / 1000);
        setComplete(Common.actID, Common.actType, Common.studyTime, Common.score, Common.speakingInfo);

        if (accept_Act.indexOf(Common.actType) === -1) {
            accept_Act.push(Common.actType);
        }

        Common.speakingInfo = "";
    }, 1000);
}

function hideAllSection() {
    $('#sentenceGameAudioSection').html("");
    $('#rdCardList').hide();
    $('#rdSentenceGame').hide();
    $('#rdWordGame').hide();
    $('#rdWordGame1').hide();
    $('#rdWordGame2').hide();
    $('#rdWordGame3').hide();
    $('#rd_reader_quiz').hide();
    $('#rdBlockCardBody').removeClass('word-card-page');
    $('#finishedSection').hide();
    $('#finishedSectionAction').hide();
    $('#rdWordGame4').hide();
}

function setComplete(actId, actType, time, score, speakingInfo) {
    // $.post("/english/pages/study/SaveStudyCompleteData.asp?v2020-02-10", { USER_SEQ: UserSeq, COURSE_ID: Request["cId"], ACT_ID: actId, STUDY_ID: StudyId, SCORE: score, ACT_TYPE: actType, TIME: time, FILE_INFO: speakingInfo }, function (result) {

    // });
}

// Read XML data from file
function readXMLFile(url, fnSuccess, fnError) {
    try {
        var xhttp = new XMLHttpRequest();
        var rs = [];
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var xml = this;
                    var xmlDoc = xml.responseXML;
                    var NewDataSet = xmlDoc.getElementsByTagName("NewDataSet")[0];
                    for (var i = 0; i < NewDataSet.children.length; i++) {
                        var item = NewDataSet.children[i];
                        var obj = {
                            id: item.attributes[0].value
                        };
                        for (var j = 0; j < item.children.length; j++) {
                            var child = item.children[j];
                            obj[child.nodeName] = child.textContent;
                        }
                        rs.push(obj);
                    }
                    return fnSuccess(rs);
                } else {
                    return fnError(this);
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    } catch (err) {
        return fnError(err);
    }
}