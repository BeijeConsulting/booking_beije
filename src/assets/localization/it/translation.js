export const TRANSLATIONS_IT = {
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
        "accept": "Accetto",
        "account": "Account",
        "announceTitle": "Annunci",
        "address": "Indirizzo",
        "backToDashboard": "Torna alla dashboard",
        "backToHome": "Torna alla home",
        "becomeAHost": "Diventa un host",
        "bookings": "Prenotazioni",
        "category": "Categoria",
        "checkIn": "Check In",
        "checkOut": "Check Out",
        "city": "Città",
        "country": "Stato",
        "dashboard": "Dashboard",
        "decline": "Rifiuta",
        "description": "Descrizione",
        "email": "Email",
        "emptyChat": "Chat vuota",
        "english": "Inglese",
        "home": "Home",
        "insertTitle": "Inserisci titolo",
        "italian": "Italiano",
        "loading": "Caricamento...",
        "loginLabel": "Accedi",
        "logout": "Esci",
        "messages": "Messaggi",
        "mra": "I più recensiti",
        "name": "Nome",
        "noMessages": "Non esistono messaggi...",
        "noApartments": "Non ci sono appartamenti da mostrare",
        "or": "o",
        "password": "Password",
        "passwordConfirm": "Conferma password",
        "pending": "In attesa",
        "photos": "Foto",
        "price": "Prezzo",
        "properties": "Strutture",
        "rate": "Recensione",
        "registerLabel": "Registrati",
        "registration": "Registrazione",
        "research": "Research",
        "rooms_one": "{{count}} stanza",
        "rooms_other": "{{count}} stanze",
        "save": "Salva",
        "searchPlaceholder": "Cerca...",
        "select": "Seleziona",
        "selected": "Selezionata",
        "send": "Invia",
        "service": "Servizio",
        "services": "Servizi",
        "submit": "Invia",
        "suggestedApartments": "Appartamenti consigliati",
        "surname": "Cognome",
        "termsConditions": "Termini e condizioni",
        "update": "Aggiorna",
        "writeMessage": "Scrivi qui il tuo messaggio...",
        "you": "Tu",
        "zipCode": "Codice postale",
        "bookNow": "Prenota adesso!"
    },
    "toasts": {
        "favouritesAdded": "La struttura \"{{name}}\" è stata aggiunta ai tuoi preferiti",
        "favouritesDeleted": "La struttura \"{{name}}\" è stata eliminata dai tuoi preferiti",
        "formErrorAllFields": "Compila tutti i campi",
        "formErrorEmail": "Inserisci una mail valida",
        "formErrorPassword": "Inserisci una password di almeno 8 caratteri, con almeno un simbolo",
        "formErrorConfirmPassword": "Le password inserite non coincidono",
        "formErrorTerms": "Accetta i termini e le condizioni",
        "formSuccess": "Tutto ok",
        "formErrorApi": "Email o password errata, prova di nuovo",
        "loginToPursue": "Registrati o effettua il login per continuare!",
        "messageError": "Nessun messaggio trovato",
        "messageNotSent": "Errore nell'invio del messaggio",
        "messageSent": "Message sent !",
        "operationAnnounce": "Titolo annuncio, campo obbligatorio",
        "operationDescription": "Descrizione, campo obbligatorio",
        "operationAddress": "Indirizzo, campo obbligatorio",
        "operationCity": "Città, campo obbligatorio",
        "operationCountry": "Stato, campo obbligatorio",
        "operationZipCode": "Codice postale, campo obbligatorio",
        "operationCheckIn": "Check In, campo obbligatorio",
        "operationCheckOut": "Check Out, campo obbligatorio",
        "operationCategory": "Categoria, campo obbligatorio",
        "operationPhotos": "Foto, campo obbligatorio",
        "operationPriceForNight": "Prezzo a notte, campo obbligatorio",
        "operationBeds": "Letti, campo obbligatorio",
        "operationServices": "Servizi, campo obbligatorio",
        "operationRooms": "Stanza, campo obbligatorio",
        "operationRules": "Regole, campo obbligatorio"
    },
    "bo": {
        "components": {
            "uploadPhoto": {
                "upload": "Carica"
            },
            "sidebar": {
                "structure": "Strutture",
                "payments": "Pagamenti"
            }
        },
        "modals": {},
        "screens": {
            "host": {
                "hostRegistration": {
                    "title": "Registrazione Host",
                    "privateRegistration": "Sono un privato",
                    "companyRegistration": "Ho un'azienda",
                    "setUpPrivateAccount": "Configura il tuo account come privato",
                    "setUpCompanyAccount": "Configura il tuo account aziendale",
                    "accept": "Accetto",
                    "termsConditionsForHost": "Termini e condizioni per gli host",
                    "fields": {
                        "phoneNumber": "Numero di telefono",
                        "postcode": "Codice postale",
                        "billingAddress": "Indirizzo di fatturazione",
                        "companyName": "Nome azienda",
                        "vatNumber": "P.IVA"
                    }
                },
                "reservationList": {
                    "title": "Lista prenotazioni",
                    "accepted": "Accettate",
                    "rejected": "Rifiutate",
                    "calendar": "Calendario",
                    "confirmReservationDeleteMessage": "Sei sicuro di voler eliminare",
                    "confirmReservationDelete": "Conferma eliminazione"
                },
                "structure": {
                    "structureListTitle": "Lista strutture",
                    "addStructure": "Aggiungi struttura"
                },
                "structureDetails": {
                    "structureDetailsTitle": "Dettagli struttura",
                    "editStructure": "Modifica struttura",
                    "addRoom": "Aggiungi camera",
                    "announce": "Annunci",
                    "night": "notte",
                    "emptyAnnounces": "Non vedo nessun annuncio in questa struttura"
                },
                "structureOperation": {
                    "structureName": "Nome struttura"
                },
                "announceOperation": {
                    "priceForNight": "Prezzo per notte",
                    "beds": "Letti",
                    "rooms": "Stanze",
                    "rules": "Regole"
                }
            },
            "admin": {
                "pendingAnnounceListTitle": "Annunci da approvare",
                "pendingStructureListTitle": "Strutture da approvare"
            }
        }
    },
    "fe": {
        "components": {
            "rooms": {
                "people_one": "{{count}} persona",
                "people_other": "{{count}} persone",
                "priceForNumberOfNights_one": "Prezzo per {{count}} notte",
                "priceForNumberOfNights_other": "Prezzo per {{count}} notti"
            },
            "review": {
                "username": "username",
                "title": "titolo"
            },
            "service": {
                "wifi": "Wi-Fi",
                "kitchen": "Cucina",
                "airConditioning": "Aria condizionata",
                "parking": "Parcheggio",
                "washingMachine": "Lavatrice",
                "iron": "Ferro da stiro",
                "workingPlace": "Spazio di lavoro dedicato",
                "swimmingPool": "Piscina",
                "allowedSmoking": "Permesso fumare",
                "alarm": "Allarme"
            }
        },
        "modals": {
            "contactHostModal": {
                "contactHost": "Contatta l'host"
            },
            "filter": {
                "apply": "Applica filtri"
            }
        },
        "screens": {
            "account": {
                "changeName": "Cambia nome",
                "changeEmail": "Cambia email",
                "changePassword": "Cambia password",
                "changeSurname": "Cambia cognome",
                "hiUsername": "Ciao, {{name}}!",
                "typePassword": "Digita la tua password..."
            },
            "favourites": {
                "noFavourites": "Nessun preferito da mostrare"
            },
            "pageNotFound": {
                "pageTitle": "Pagina non trovata",
                "pageDescription": "Siamo spiacenti, ma la pagina che stai cercando non è stata trovata."
            },
            "registration": {
                "acceptTerms": "Accetto i termini e le condizioni"
            },
            "settings": {
                "title": "Impostazioni",
                "settingsCard": {
                    "favourites": "Preferiti",
                    "yourProperties": "Le tue proprietà"
                }
            },
            "propertyDetails": {
                "details": "Dettagli",
                "roomDetails": "Dettaglio stanza",
                "noProperty": "Struttura non disponibile."
            },
            "homePage": {
                "searchButton": "Cerca destinazione"
            },
            "bookings": {
                "history": "Storico",
                "planned": "Pianificati",
                "refused": "Rifiutati"
            },
            "searchResult": {
                "filterButton": "Filtri",
                "mapButton": "Mappa"
            },
            "checkout": {
                "checkoutPageTitle": "Carrello",
                "confirmPayment": "Conferma pagamento",
                "paymentSuccessful": "Pagamento effettuato con successo",
                "qty": "Qta",
                "total": "Totale"
            }
        }
    }
}