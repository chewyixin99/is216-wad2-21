import { createStore } from 'vuex'
import db from "../firebase/firebaseInit";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';


const store = createStore({
    state: {
        //=== User
        user: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileID: null,
        profileInitials: null,
        profileExperience: null,
        profileFavPlayer: null,
        profileFavTeam: null,
        profileGroupID: null,
        profileLoggedInTime: null,

        profileLatestCourtID: null,
        profileLatestCheckin: null,
        profileLatestCheckout: null,

        //=== Court
        //--- Court PopUp
        courtCheckinHidden: true,
    },

    mutations: { //INTERACTIONS BETWEEN STORE AND VUE

        //=== User
        updateUser(state, payload){
            state.user = payload
        },
        setProfileInfo(state, doc){
            state.profileID = doc.id;
            state.profileEmail = doc.data().email;
            state.profileFirstName = doc.data().firstName;
            state.profileLastName = doc.data().lastName;
            state.profileExperience = doc.data().experience;
            state.profileFavPlayer = doc.data().favPlayer;
            state.profileFavTeam = doc.data().favTeam;
            state.profileGroupID = doc.data().groupID; 
            state.profileLoggedInTime = doc.data().loggedInTime;
            state.profileActiveCourt = doc.data().activeCourt;
        },

        setprofileLatestCheckOut(state, payload) {
            state.profileLatestCheckin = payload.latestCheckinTime
            state.profileLatestCheckout = payload.latestCheckoutTime
            state.latestCourtID = payload.latestCourtID
        },

        changeFirstName(state, payload) {
            state.profileFirstName = payload;
        },
        changeLastName(state, payload) {
            state.profileLastName = payload;
        },
        changeFavPlayer(state, payload) {
            state.profileFavPlayer = payload;
        },
        changeFavTeam(state, payload) {
            state.profileFavTeam = payload;
        },
        changeExperience(state, payload) {
            state.profileExperience = payload;
        },
        
        //=== Court
        //--- Court PopUp
        courtToggleCheckinHidden(state) {
            if (state.courtCheckinHidden) {
                state.courtCheckinHidden = false
            } else {
                state.courtCheckinHidden = true
            }
        },

        courtCheckIn(state, payload) {
            state.courtCurrentUserCheckin = payload.dbCheckinTime
            state.courtCurrentUserCheckout = payload.dbCheckoutTime
        }

    },

    actions: { //INTERACTIONS BETWEEN STORE AND FIREBASE 

        async getCurrentUser({commit, dispatch}){
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
            const dbResults = await dataBase.get();
            commit("setProfileInfo", dbResults);
            console.log(dbResults);

            dispatch("getProfileLatestCheckout")
        },

        async getProfileLatestCheckout({state, commit}) {
            console.log(state.user);
            const dataBase = await db.collection('users').doc(state.profileID).collection("checkinHistory").orderBy("checkoutTime", "desc").limit(1)
            dataBase.get().then(
                (latestCheckoutDoc) => {
                    if (latestCheckoutDoc.docs) {
                        console.log("[checkinHistory collection] Retrieved latest check out time.");
                        let latestCheckinTime = latestCheckoutDoc.docs[0].data().checkinTime.toDate()
                        let latestCheckoutTime = latestCheckoutDoc.docs[0].data().checkoutTime.toDate()
                        commit("setprofileLatestCheckOut", {latestCheckinTime: latestCheckinTime, latestCheckoutTime: latestCheckoutTime, latestCourtID: latestCheckoutDoc.docs[0].data().courtID})
                    } else {
                        console.log("[checkinHistory collection] No check in history, this guy is probably a new player.");
                    }
                }).catch((error) => {
                    console.log("[checkinHistory collection] Error getting document: ", error);
                })
        },

        async updateUserSettings({state}){
            const dataBase = await db.collection('users').doc(state.profileID);
            await dataBase.update({
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                favPlayer: state.profileFavPlayer,
                favTeam: state.profileFavTeam,
                experience: state.profileExperience,
            })
        },

        //=== Court
        //--- Court PopUp

        // async addCheckinHistory({state}) {
        //     // Check if the user is currently checked in from the state
        //     // 


        //     const dataBase = await db.collection('users').doc(state.pofileID).collection('checkinHistory')
        //     .where("courtID", "==", "")
        //     // Find document where same court, same checkin time in collection checkinHistory
        //     console.log(dataBase);
                // const dataBase = await db.collection('users').doc(state.profileID).collection("checkinHistory").orderBy("checkoutTime").limit(1)
                // dataBase.get().then(
                //     (checkoutTimeSnapshot) => {
                //         if (checkoutTimeSnapshot.exists) {
                //             console.log("Document data:", checkoutTimeSnapshot.data());
                //         } else {
                //             console.log("No such document!");
                //         }
                //     }).catch((error) => {
                //         console.log("Error getting document:", error);
                //     })
        // }
    },

    modules: {

    },

});

export default store