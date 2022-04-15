/** 
 * Index.js File for all js functions and api calls from frontend
 */
function clear(params) {
    $('#msg').html('');
}

//Dropdown for different sources
async function selectType() {
    clearMenus();
    var value = $('#source').val();
    if (value != "") {
        switch (value) {
            case 'website':
                clear();
                addWebsiteMenu();
                break;
            case 'book':
                clear();
                addBookMenu();
                break;
            case 'news-paper':
                clear();
                addNewsPaperMenu();
                break;
            case 'scientific-journal':
                clear();
                addJournalMenu();
                break;
            case 'other':
                clear();
                addOtherMenu();
                break;
            default:
                break;
        }
    } else {
        clear();
    }
}

function addWebsiteMenu() {
    $('#menus').append('<div class="website"><input type="url" name="website-link" id="website-link" class="website-link url" placeholder="Link to website" required></div>');
}

function addBookMenu() {
    $('#menus').append('<div class="book"><input type="url" name="book-link" id="book-link" class="book-link url" placeholder="Link to Source" required><input type="text" name="isbn-no" id="isbn-no" class="isbn-no" placeholder="ISBN No."><div class="book-other-options"><input type="text" name="topic" id="topic" class="topic" placeholder="Topic From The Book"><input type="number" name="page-no" id="page-no" class="page-no" placeholder="Page No."></div></div>');
}

function addNewsPaperMenu() {
    $('#menus').append('<div class="news-paper"><input type="url" name="news-link" id="news-link" class="news-link url" placeholder="Link to Source" required><div class="news-other-options1"><input type="text" name="name" id="name" class="paperName" placeholder="Newspaper Name"><input type="date" name="date" id="date" class="paperDate" placeholder="Newspaper Date"></div><div class="news-other-options2"><input type="text" name="location" id="location" class="location" placeholder="Location of Newspaper"><input type="text" name="article" id="article" class="article" placeholder="Article"></div></div>');
}

function addJournalMenu() {
    $('#menus').append(' <div class="journal"><input type="url" name="journal-link" id="journal-link" class="journal-link url" placeholder="Link to Source"><div class="journal-other-options1"><input type="text" name="name" id="name" class="journalName" placeholder="Journal Name"><input type="date" name="date" id="date" class="journalDate" placeholder="Journal Date"></div><div class="journal-other-options2"><input type="text" name="author" id="author" class="author" placeholder="Author"></div></div>');
}

function addOtherMenu() {
    $('#menus').append('<div class="other"><input type="url" name="other-link" id="other-link" class="other-link url" placeholder="Link to Source" required><input type="text" name="other-text" id="other-text" class="other-text" placeholder="Details Of Source" required></div>');
}

$("#watchPage").click(function () {
    $("#watchPageDropdown").attr('disabled', !this.checked)
});

function clearMenus() {
    $("#menus").html("");
}

function clear() {
    $("#msg").hide();
    $("#msg").html("");
}

function successMsg(msg) {
    $("#msg").show();
    $("#msg").append('<span style="color: green;">' + msg.message + "</span>");
}

async function showErr(err) {
    $("#msg").show();
    $("#msg").append('<span style="color: red;">' + err.message + "</span>");
}

//function to validate quote
async function validateTextarea() {
    return !(/^\s*$/.test($('#quote').val()));
}

//main function for all validations
async function validateAndRequest() {
    clear();
    var data = {
        url: $(".url").val(),
        quote: $("#quote").val()
    }
    if (await validateTextarea()) {
        //api call to validate source
        api.source.validateUrl(
            data,
            function (res) {
                //success
                if (res.code == 200) {
                    //api call to validate if quote is from source
                    api.source.validateSource(
                        data,
                        function (res) {
                            //success
                            api.source.submitEditRequest(
                                function (res) {
                                    clear();
                                    console.log(res);
                                    successMsg(res)
                                },
                                function (error) {
                                    clear();
                                    showErr(error)
                                }
                            )
                        },
                        function (err) {
                            //faliure
                            showErr(err);
                        }
                    )
                } else {
                    showErr({
                        message: "Not a Valid Source"
                    });
                }
            },
            function (error) {
                //faliure
                console.log(error);
                showErr(error);
            }
        )
    } else {
        showErr({
            message: "Not a Valid Quote"
        });
    }
}

$(document).ready(function () {
    $("#msg").hide();
});