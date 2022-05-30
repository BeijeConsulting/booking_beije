export const TRANSLATIONS_IT ={
   "common": {
      "number": "{{value, number(minimumFractionDigits: 2)}}",
      "currency": "{{price, currency(currency: EUR)}}",
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
      "selected": "Selezionata",
      "announceTitle": "Annunci",
      "backToHome": "Torna alla home",
      "bookings": "Prenotazioni",
      "category": "Categoria",
      "change": "Cambia",
      "checkIn": "Check In",
      "checkOut": "Check Out",
      "decline": "Rifiuta",
      "description": "Descrizione",
      "email": "Email",
      "english": "Inglese",
      "emptyChat": "Chat vuota",
      "home": "Home",
      "insertTitle": "Inserisci titolo",
      "italian": "Italiano",
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
      "photos": "Foto",
      "price": "Prezzo",
      "properties": "Strutture",
      "rate":"Recensione",
      "registerLabel": "Registrati",
      "registration": "Registrazione",
      "research": "Research",
      "rooms": "{{count}} stanza",
      "rooms_other": "{{count}} stanze",
      "save": "Salva",
      "searchPlaceholder": "Cerca...",
      "select": "Seleziona",
      "send": "Invia",
      "services": "Servizi",
      "submit": "Invia",
      "surname": "Cognome",
      "termsConditions": "Termini e condizioni",
      "update": "Aggiorna",
      "writeMessage": "Scrivi qui il tuo messaggio...",
      "you": "Tu",
      "address": "Indirizzo",
      "city": "Città",
      "country": "Stato",
      "zipCode": "Codice postale",
      "suggestedApartaments": "Appartamenti consigliati",
      "bookNow": "Prenota adesso!"
   },
   "toasts": {
      "favouritesDeleted": "La struttura {{name}} è stata eliminata dai tuoi preferiti",
      "formErrorAllFields": "Compila tutti i campi",
      "formErrorEmail": "Inserisci una mail valida",
      "formErrorPassword": "Inserisci una password di almeno 8 caratteri, con almeno un simbolo",
      "formErrorConfirmPassword": "Le password inserite non coincidono",
      "formErrorTerms": "Accetta i termini e le condizioni",
      "formSuccess": "Tutto ok",
      "formErrorApi": "Email o password errata, prova di nuovo",
      "loginToPursue" : "Registrati o effettua il login per continuare!",
      "messageError": "Nessun messaggio trovato",
      "messageNotSent" : "Errore nell invio del messaggio",
      "messageSent" : "Message sent !",
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
         "sidebar": {
            "structure": "Strutture",
            "payments": "Pagamenti"
         },
         "uploadPhoto": {
            "upload": "Carica"
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
                  "city": "Città",
                  "postcode": "Codice postale",
                  "billingAddress": "Indirizzo di fatturazione",
                  "companyName": "Nome azienda",
                  "vatNumber": "P.IVA",
                  "registerButton": "Registrati"
               }
            },
            "reservationList": {
               "title": "Lista prenotazioni",
               "accepted": "Accettate",
               "pending": "In attesa",
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
               "announce": "Annunci"
            },
            "structureOperation": {
               "structureName": "Nome struttura"
            },
            "announceOperation": {
               "photos": "Foto",
               "priceForNight": "Prezzo per notte",
               "beds": "Letti",
               "services": "Servizi",
               "rooms": "Stanze",
               "rules": "Regole"
            },
            "admin": {
               "pendingAnnounceListTitle": "Annunci da approvare",
               "pendingStructureListTitle": "Strutture da approvare"
            }
         }
      }
   },
   "fe": {
      "components": {
         "rooms": {
            "person": "Persona",
            "people": "Persone",
            "price": "Prezzo per",
            "nights": "notti",
            "night": "notte"
         },
         "review": {
            "username": "username",
            "title": "titolo",
            "description": "descrizione"
         },
         "service": {
            "service": "Servizio",
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
         "contactHostModal" : {
            "contactHost" : "Contatta l host"
         },
         "filter": {
            "apply": "Applica filtri"
         }
      },
      "screens": {
         "favourites": {
            "noFavourites": "Nessun preferito da mostrare"
         },
         "guestAccount": {
            "becomeAHost": "Diventa un host"
         },
         "registration": {
            "acceptTerms": "Accetto i termini e le condizioni"
         },
         "settings": {
            "title": "Impostazioni",
            "settingsCard": {
               "account": "Account",
               "favourites": "Preferiti",
               "becomeAHost": "Diventa un Host",
               "yourProperties": "Le tue proprietà"
            }
         },
         "propertyDetails": {
            "details": "Dettagli",
            "roomDetails": "Dettaglio stanza",
            "noProperty": "Struttura non disponibile."
         },
         "bookings": {
            "history": "Storico",
            "pending": "In attesa",
            "planned": "Pianificati",
            "refused": "Rifiutati"
         },
         "homePage": {
            "searchButton": "Cerca destinazione"
         },
         "searchResult": {
            "filterButton": "Filtri",
            "mapButton": "Mappa"
         },
         "checkout": {
            "total": "Totale",
            "confirmPayment": "Conferma pagamento",
            "price": " Prezzo",
            "qty": "Qta"
         }
      }
   }
}