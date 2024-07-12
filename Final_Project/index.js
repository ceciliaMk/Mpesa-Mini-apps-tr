var app = angular.module("briakbookingApp", []);
app.controller("BehaviourController", function($scope) {
    this.persistedSelections = [];
    this.seats = [];
    this.row = 5;
    this.col = 5;
    
    var self = this;
    this.init = function() {
        this.showWelcomeText = true;
        this.showCategories = false;
        this.showNameInput = false;
        this.showIDInput = false;
        this.showDateInput = false;
        this.showTimeInput = false;
        this.showTicketQtyInput = false;
        this.mainText = "Welcome! Would you like to book a bus ticket?";
        this.buttonText = "Book Now!";
        this.name = undefined;
        this.idNumber = undefined;
        this.travelDate = undefined;
        this.travelTime = undefined;
        this.count = undefined;
        this.selected = [];
        
        this.buildSeatMap();
    };

    this.nextStep = function() {
        if (this.name === undefined) {
            this.mainText = "Okay, please tell us your name";
            this.showNameInput = true;
            this.buttonText = "Next";
        } else if (this.idNumber === undefined) {
            this.mainText = "Please enter your ID number";
            this.showIDInput = true;
            this.buttonText = "Next";
        } else if (this.travelDate === undefined) {
            this.mainText = "Please select your travel date";
            this.showDateInput = true;
            this.buttonText = "Next";
            $('.datepicker').datepicker({ format: 'mm/dd/yyyy', startDate: '-3d' });
        } else if (this.travelTime === undefined) {
            this.mainText = "Please select your travel time";
            this.showTimeInput = true;
            this.buttonText = "Next";
        } else if (this.count === undefined) {
            this.mainText = "Hi " + this.name + "! Please enter the number of tickets you wish to buy";
            this.showTicketQtyInput = true;
            this.buttonText = "Show me seats!";
        } else if (this.selected.length === 0) {
            this.showWelcomeText = false;
            this.mainText = "At your service! Now " + this.name + ", Please choose your seats";
            this.showCategories = true;
            this.showNameInput = false;
            this.showIDInput = false;
            this.showDateInput = false;
            this.showTimeInput = false;
            this.showTicketQtyInput = false;
            this.buttonText = "Confirm my booking!";
        } else if (this.count >= this.selected.length) {
            // save and flush
            var saveSelectionObject = {
                "name": this.name,
                "idNumber": this.idNumber,
                "travelDate": this.travelDate,
                "travelTime": this.travelTime,
                "count": this.selected.length,
                "seats": this.selected
            };
            for (var i = 0; i < this.selected.length; i++) {
                var seat = this.selected[i];
                var seatIndex = this.getSeatIndex(seat);
                this.seats[seatIndex].old = true;
            }
            this.persistedSelections.push(saveSelectionObject);
            this.init();
        }
    };

    this.getSeatIndex = function(seat) {
        var seatIndex = _.findIndex(this.seats, { 'name': seat });
        return seatIndex;
    };

    this.deSelect = function(seat) {
        var seatIndex = this.getSeatIndex(seat);
        this.seats[seatIndex].reserved = false;
        var index;
        for (var i = 0; i < this.selected.length; i++) {
            if (this.selected[i] == seat) {
                index = i;
            }
        }
        this.selected.splice(index, 1);
    };

    this.select = function(seat) {
        var flag = false;
        if (this.selected.length !== undefined) {
            if (this.selected.length < this.count) {
                flag = true;
            }
            for (var i = 0; i < this.selected.length; i++) {
                if (this.selected[i] == seat) {
                    flag = false;
                    this.deSelect(seat);
                    break;
                }
            }
        } else {
            flag = true;
        }
        var seatIndex = this.getSeatIndex(seat);
        if (this.seats[seatIndex].reserved) {
            flag = false;
        }
        if (flag) {
            this.selected.push(seat);
            this.seats[seatIndex].reserved = true;
        }
    };

    this.buildSeatMap = function() {
        if (this.seats.length === 0) {
            for (var i = 1; i <= this.row; i++) {
                for (var j = 1; j <= this.col; j++) {
                    var newLine = (j == this.col);
                    var name = "S" + i + j;
                    var seat = {
                        "id": i + j,
                        "name": name,
                        "reserved": false,
                        "old": false,
                        "newLine": newLine
                    };
                    this.seats.push(seat);
                }
            }
        }
    };

    this.showReservationList = function() {
        return this.persistedSelections.length > 0;
    };
});
