export const TRANSLATIONS_EN = {
    "common": {
        "number": "{{value, number(minimumFractionDigits: 2)}}",
        "currency": "{{price, currency(currency: EUR)}}",
        "currencyTwoFractionDigits": "{{price, currency(currency: EUR; maximumFractionDigits: 2)}}",
        "shortDate": "{{value, datetime(date: value; year: numeric; month: 2-digit; day: 2-digit)}}",
        "extendedDate": "{{value, datetime(date: value; weekday: long; year: numeric; month: long; day: numeric)}}",
        "time": "{{value, datetime(date: value; hour: numeric; minute: numeric)}}",
        "relativeDay": "{{value, relativetime(day)}}",
        "relativeDayExplicitNarrow": "{{value, relativetime(range: day; numeric: auto; style: narrow;)}}",
        "relativeDayExplicitLong": "{{value, relativetime(range: day; numeric: auto; style: long;)}}",
        "relativeMonth": "{{value, relativetime(range: month)}}",
        "relativeMonthLong": "{{value, relativetime(range: month; numeric: auto)}}",
        "accept": "Accept",
        "account": "Account",
        "announceTitle": "Announce title",
        "address": "Address",
        "backToDashboard": "Back to dashboard",
        "backToHome": "Back to home",
        "becomeAHost": "Become a host",
        "bookings": "Bookings",
        "category": "Category",
        "checkIn": "Check In",
        "checkOut": "Check Out",
        "city": "City",
        "country": "Country",
        "dashboard": "Dashboard",
        "decline": "Decline",
        "description": "Description",
        "email": "Email",
        "emptyChat": "Empty chat",
        "english": "English",
        "home": "Home",
        "insertTitle": "Insert title",
        "italian": "Italian",
        "loading": "Loading...",
        "loginLabel": "Login",
        "logout": "Logout",
        "messages": "Messages",
        "mra": "Most reviewed apartments",
        "name": "Name",
        "noMessages": "No messages found",
        "noApartments": "No apartments to show.",
        "or": "or",
        "password": "Password",
        "passwordConfirm": "Confirm password",
        "pending": "Pending",
        "photos": "Photos",
        "price": "Price",
        "properties": "Properties",
        "rate": "Rate",
        "registerLabel": "Register",
        "registration": "Registration",
        "research": "Research",
        "rooms_one": "{{count}} room",
        "rooms_other": "{{count}} rooms",
        "save": "Save",
        "searchPlaceholder": "Search...",
        "select": "Select",
        "selected": "Selezionata",
        "send": "Send",
        "service": "Service",
        "services": "Services",
        "submit": "Submit",
        "suggestedApartments": "Suggested apartments",
        "surname": "Surname",
        "termsConditions": "Terms and Agreement",
        "update": "Update",
        "writeMessage": "Write your message here...",
        "you": "You",
        "zipCode": "ZIP code",
        "bookNow": "Book now!"
    },
    "toasts": {
        "favouritesAdded": "\"{{name}}\" has been added to your favourites",
        "favouritesDeleted": "\"{{name}}\" has been deleted from your favourites",
        "formErrorAllFields": "Please, fill in all fields",
        "formErrorEmail": "Please, insert a valid email",
        "formErrorPassword": "Please, insert a valid password: at least 8 characters long, 1 capital letter and 1 symbol",
        "formErrorConfirmPassword": "Passwords do not match",
        "formErrorTerms": "You must accept the terms and conditions",
        "formSuccess": "Success!",
        "formErrorApi": "Wrong email or password, try again",
        "loginToPursue": "You have to sign in or register if you want to continue",
        "messageError": "No messages",
        "messageNotSent": "Error on sending message",
        "messageSent": "Messaggio inviato !",
        "operationAnnounce": "Announce title, input required",
        "operationDescription": "Description, input required",
        "operationAddress": "Address, input required",
        "operationCity": "City, input required",
        "operationCountry": "Country, input required",
        "operationZipCode": "ZIP code, input required",
        "operationCheckIn": "Check In, input required",
        "operationCheckOut": "Check Out, input required",
        "operationCategory": "Category, input required",
        "operationPhotos": "Photos, input required",
        "operationPriceForNight": "Price for night, input required",
        "operationBeds": "Beds, input required",
        "operationServices": "services, input required",
        "operationRooms": "Rooms, input required",
        "operationRules": "Rules, input required"
    },
    "bo": {
        "components": {
            "uploadPhoto": {
                "upload": "Upload"
            },
            "sidebar": {
                "structure": "Structures",
                "payments": "Payments"
            }
        },
        "modals": {},
        "screens": {
            "host": {
                "hostRegistration": {
                    "title": "Host registration",
                    "privateRegistration": "I'm a private",
                    "companyRegistration": "I have a company",
                    "setUpPrivateAccount": "Set up your private account",
                    "setUpCompanyAccount": "Set up your company account",
                    "accept": "I accept",
                    "termsConditionsForHost": "Terms and Conditions for Host",
                    "fields": {
                        "phoneNumber": "Phone number",
                        "postcode": "Postcode",
                        "billingAddress": "Billing address",
                        "companyName": "Company name",
                        "vatNumber": "VAT"
                    }
                },
                "reservationList": {
                    "title": "Reservation list",
                    "accepted": "Accepted",
                    "rejected": "Rejected",
                    "calendar": "Calendar",
                    "confirmReservationDeleteMessage": "Are you sure you want to delete",
                    "confirmReservationDelete": "Confirm removal"
                },
                "structure": {
                    "structureListTitle": "Structure list",
                    "addStructure": "Add structure"
                },
                "structureDetails": {
                    "structureDetailsTitle": "Structure details",
                    "editStructure": "Edit structure",
                    "addRoom": "Add room",
                    "announce": "Announce",
                    "night": "night",
                    "emptyAnnounces": "No announces in this structure yet"
                },
                "structureOperation": {
                    "structureName": "Structure name"
                },
                "announceOperation": {
                    "priceForNight": "Price for night",
                    "beds": "Beds",
                    "rooms": "Rooms",
                    "rules": "Rules"
                }
            },
            "admin": {
                "pendingAnnounceListTitle": "Pending announces",
                "pendingStructureListTitle": "Pending structures"
            }
        }
    },
    "fe": {
        "components": {
            "rooms": {
                "people_one": "{{count}} person",
                "people_other": "{{count}} people",
                "priceForNumberOfNights_one": "Price for {{count}} night",
                "priceForNumberOfNights_other": "Price for {{count}} nights"
            },
            "review": {
                "username": "username",
                "title": "title"
            },
            "service": {
                "wifi": "Wi-Fi",
                "kitchen": "Kitchen",
                "airConditioning": "Air conditioning",
                "parking": "Parking",
                "washingMachine": "Washing machine",
                "iron": "Iron",
                "workingPlace": "Shared working place",
                "swimmingPool": "Swimming pool",
                "allowedSmoking": "Allowed Smoking",
                "alarm": "Alarm"
            }
        },
        "modals": {
            "contactHostModal": {
                "contactHost": "Contact host"
            },
            "filter": {
                "apply": "Apply filters"
            }
        },
        "screens": {
            "account": {
                "changeName": "Change name",
                "changeEmail": "Change email",
                "changePassword": "Change password",
                "changeSurname": "Change surname",
                "hiUsername": "Hi, {{name}}!",
                "typePassword": "Type your password..."
            },
            "favourites": {
                "noFavourites": "No favourites to show"
            },
            "pageNotFound": {
                "pageTitle": "Page not found",
                "pageDescription": "Sorry, the page you're looking for was not found."
            },
            "registration": {
                "acceptTerms": "I accept the terms and conditions"
            },
            "settings": {
                "title": "Settings",
                "settingsCard": {
                    "favourites": "Favourites",
                    "yourProperties": "Your properties"
                }
            },
            "propertyDetails": {
                "details": "Details",
                "roomDetails": "Room details",
                "noProperty": "Unavailable property."
            },
            "homePage": {
                "searchButton": "Search your destination"
            },
            "bookings": {
                "history": "History",
                "planned": "Planned",
                "refused": "Rejected"
            },
            "searchResult": {
                "filterButton": "Filters",
                "mapButton": "Map"
            },
            "checkout": {
                "checkoutPageTitle": "Checkout",
                "confirmPayment": "Confirm payment",
                "paymentSuccessful": "The payment was successful",
                "qty": "Qty",
                "total": "Total"
            }
        }
    }
}