// Vuex persistedState imports
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


import db from "../firebase/firebaseInit";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';


const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        })
    ],
    state: {
        //=== User
        user: ``,
        profileEmail: ``,
        profileFirstName: ``,
        profileLastName: ``,
        profileID: ``,
        profileInitials: ``,
        profileExperience: ``,
        profileFavPlayer: ``,
        profileFavTeam: ``,
        profileGroupID: ``,
        profileLoggedInTime: ``,
        profileInitialsURL: null,
        profileImg: null,
      
        newGroupExp: ``,
        newGroupName: ``,
        newGroupID: ``,
        memberID: ``, // TBC
        groupName: ``, // TBC
        groupEXP: ``, // TBC
        groupInfo: ``,
        currentMemberID: ``,
        currentGroupID: ``,



        profileActiveCourt: ``,
        profileMostRelevantCourtID: ``,
        profileMostRelevantCheckin: ``,
        profileMostRelevantCheckout: ``,


        // default profile avatar
        defaultProfileImg: `https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png`,

        //=== Court
        //--- Court PopUp
        courtShowCheckinModal: false,

        // == selectedCourt
        selectedCourt: `defaultValue`,

        // == selectedProfle
        selectedProfile:`defaultValue`,

    },

    mutations: { //INTERACTIONS BETWEEN STORE AND VUE


        inputCurrentMember(state, payload){
            state.currentMemberID = payload;
        },

        inputCurrentGroup(state, payload){
            state.currentGroupID = payload;
        },


        newGroupName(state, payload){
            state.newGroupName = payload;
        },

        newGroupExp(state, payload){
            state.newGroupExp = payload;
        },



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
            state.profileImg = doc.data().profileImg;
        },

        setProfileInitials(state){
            state.profileInitials = 
            state.profileFirstName.match(/(\b\S)?/g).join("") + 
            state.profileLastName.match(/(\b\S)?/g).join("");
        },

        setProfileInitialsURL(state){
            state.profileInitialsURL = "https://ui-avatars.com/api/?name=" + state.profileInitials
        },
        
        setProfileLatestCheckIO(state, payload) {
            state.profileActiveCourt = payload.activeCourt
            state.profileMostRelevantCourtID = payload.mostRelevantCourtID
            state.profileMostRelevantCheckin = payload.mostRelevantCheckinTime
            state.profileMostRelevantCheckout = payload.mostRelevantCheckoutTime
        },

        changeProfileImg(state, payload) {
            state.profileImg = payload;
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
        changeFlag(state, payload) {
            state.isflag = payload;
        },
        
        //=== Court
        //--- Court PopUp
        courtDefaultCheckinModal(state) {
            state.courtShowCheckinModal = false
        },

        courtToggleCheckinModal(state) {
            if (state.courtShowCheckinModal) {
                state.courtShowCheckinModal = false
            } else {
                state.courtShowCheckinModal = true
            }
        },

        courtCheckIn(state, payload) {
            state.courtCurrentUserCheckin = payload.dbCheckinTime
            state.courtCurrentUserCheckout = payload.dbCheckoutTime
        },


        // == State management from homepage to publicProfile/selectedCourt
        updateSelectedCourt(state, payload) {
            state.selectedCourt = payload
            console.log(`From updateSelectedCourt mutation`)
            console.log(state.selectedCourt)
        },

        updateSelectedProfile(state, payload) {
            state.selectedProfile = payload
            console.log(`From updateSelectedProfile mutation`)
            console.log(state.selectedProfile)
        },
        

    },

    //INTERACTIONS BETWEEN STORE AND FIREBASE 
    actions: { 


        // RETRIEVE USER INFO


        async getCurrentUser({commit, dispatch}){
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
            const dbResults = await dataBase.get();
            commit("setProfileInfo", dbResults);
            commit("setProfileInitials");
            commit("setProfileInitialsURL")
            console.log(dbResults);
            

            dispatch("getProfileCheckIO")
        },

        async getProfileLatestIO({state, commit}) {
            // Gets the most relevant history
            let currentTime = firebase.firestore.Timestamp.now()
            let payload = {}
            let isActive = false

            // 1. Check for any current ACTIVE check ins
            await db.collection('users').doc(state.profileID).collection("checkinHistory")
            .where('checkoutTime', '>', currentTime) // Looks for all checkouts that haven't occured (if user has current booking)
            .get()
            .then((possibleTimeslots) => {
                possibleTimeslots.forEach((possibleTimeslotsDoc) => {
                    // Assumption is we only allow 1 check in at all times in DB
                    if (possibleTimeslotsDoc.data().checkinTime <= currentTime){ // Looks for check in that are smaller than current time (user currently active)
                        payload["activeCourt"] = possibleTimeslotsDoc.data().courtID
                        payload["mostRelevantCourtID"] = possibleTimeslotsDoc.data().courtID
                        payload["mostRelevantCheckinTime"] = possibleTimeslotsDoc.data().checkinTime.toDate()
                        payload["mostRelevantCheckoutTime"] = possibleTimeslotsDoc.data().checkoutTime.toDate()
                        
                        isActive = true
                        commit("setProfileLatestCheckIO", payload)
                        console.log(`[checkinHistory collection] User is currently active.`);
                    }
                })
            }).catch((error) => {
                console.log("[checkinHistory collection] Error adding to firebase: ", error);
            })

        
            // 2. If there are NO ACTIVE courts, we take the latest booking as the most relevant one
            if (!isActive) {
                console.log("hello");
                await db.collection('users').doc(state.profileID).collection("checkinHistory").orderBy("checkoutTime", "desc").limit(1)
                .get().then(
                    (latestCheckoutDoc) => {
                        if (latestCheckoutDoc.docs) {
                            payload["activeCourt"] = null
                            payload["mostRelevantCourtID"] = latestCheckoutDoc[0].data().courtID
                            payload["mostRelevantCheckinTime"] = latestCheckoutDoc[0].data().checkinTime.toDate()
                            payload["mostRelevantCheckoutTime"] = latestCheckoutDoc[0].data().checkoutTime.toDate()
                            
                            commit("setProfileLatestCheckIO", payload)
                            console.log(`[checkinHistory collection] User is currently NOT active.`);
                        } else {
                            console.log("[checkinHistory collection] No check in history, this guy is probably a new player.");
                        }
                    }).catch((error) => {
                        console.log("[checkinHistory collection] Error getting document: ", error);
                    })
            }

        },

        // UPDATE USER INFO FOR ONBOARDING, PROFILE PAGE
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
        async getGroupID({state}){ 
            const dataBase = await db.collection('users').doc(state.profileID).get()
            state.profileGroupID = dataBase.data().groupID;
            console.log("this");

        },

        async addNewMember({state}){

            const dataBase = await db.collection('users').doc(state.currentMemberID).get()
            
                const newMemberGroup = dataBase.data().groupID

                const compilation1 = [];
                for (var i = 0; i < newMemberGroup.length; i++){
                    if (newMemberGroup[i] != ""){
                        compilation1.push(newMemberGroup[i]);
                    }
                    
                }
                compilation1.push(state.currentGroupID)

                console.log(compilation1);


            const dataBase2 = await db.collection('users').doc(state.currentMemberID);
            
            await dataBase2.update({

                groupID: compilation1,
                
            })

            const dataBase3 = await db.collection('groups').doc(state.currentGroupID).get()
            
            const groupIDObj = dataBase3.data().memberID
                
                const compilation = [];
                for (var j = 0; j < groupIDObj.length; j++){
                    if (groupIDObj[j] != ""){
                        compilation.push(groupIDObj[j]);
                        console.log(groupIDObj[j]);
                        console.log("this");
                    }
                    
                }
                compilation.push(state.currentMemberID)

                console.log(compilation);
                console.log("^this is group com");
                console.log(state.currentGroupID);

            const dataBase4 = await db.collection('groups').doc(state.currentGroupID);
            
            await dataBase4.update({

                memberID: compilation,
                
        })
            
        },
      
        async removeMember({state}){

            const dataBase = await db.collection('users').doc(state.currentMemberID).get()
            
                const newMemberGroup = dataBase.data().groupID

                const compilation1 = [];
                for (var i = 0; i < newMemberGroup.length; i++){
                    if (newMemberGroup[i] != ""){
                        compilation1.push(newMemberGroup[i]);
                    }
                    
                }

                let index = compilation1.indexOf(state.currentGroupID)
                compilation1.splice(index,1)

                console.log(compilation1);


            const dataBase2 = await db.collection('users').doc(state.currentMemberID);
            
            await dataBase2.update({

                groupID: compilation1,
                
            })

            const dataBase3 = await db.collection('groups').doc(state.currentGroupID).get()
            
            const groupIDObj = dataBase3.data().memberID
                
                const compilation = [];
                for (var j = 0; j < groupIDObj.length; j++){
                    if (groupIDObj[j] != ""){
                        compilation.push(groupIDObj[j]);
                        console.log(groupIDObj[j]);
                        console.log("this");
                    }
                    
                }
                let index2 = compilation.indexOf(state.currentMemberID)
                compilation.splice(index2,1)
                
                console.log(compilation);
                console.log("^this is group com");
                console.log(state.currentGroupID);

            const dataBase4 = await db.collection('groups').doc(state.currentGroupID);
            
            await dataBase4.update({

                memberID: compilation,
                
        })
            
        },
        
        // ADD A NEW GROUP TO DATABASE AND ADD GROUP ID TO USER INFO
        async addNewGroup({state}){
            const dataBase = await db.collection("groups").add({
                groupName: state.newGroupName,
                groupExp: state.newGroupExp,
                memberID: [state.profileID]
            });

            state.newGroupID = dataBase.id

            const dataBase2 = await db.collection('users').doc(state.profileID).get()
            
                const groupIDObj = dataBase2.data().groupID

                const compilation = [];
                for (var i = 0; i < groupIDObj.length; i++){
                    if (groupIDObj[i] != ""){
                        compilation.push(groupIDObj[i]);
                    }
                    
                }
                compilation.push(state.newGroupID)

            const dataBase3 = await db.collection('users').doc(state.profileID);
            
            await dataBase3.update({

                groupID: compilation,
                
            })

            state.profileGroupID = compilation
            console.log("addnewgroup is completed");
            
        },    

        // async updateUserGroupID({state}){
        //     db.collection('users').doc(state.profileID).get().then((docRef) =>
        //     {
        //         const groupIDObj = docRef.data().groupID
        //         console.log(groupIDObj);
        //         const compilation = [];
        //         for (var i = 0; i < groupIDObj.length; i++){
        //             compilation.push(groupIDObj[i]);
        //         }
        //         console.log(state.newGroupID);
        //         compilation.push(state.newGroupID)
        //         console.log(compilation);
        //         // db.collection("users").doc(state.profileID).update({
        //         //     groupID: compilation
        //         // })
        //     });
            // console.log(dataBase);
            // console.log(typeof(dataBase));
            // console.log("here");
            // const GroupObJ = dataBase.data().groupID
            
            // for (let groupid in GroupObJ){
            //     console.log(groupid);
            // }
            // console.log(state.profileGroupID);
            // console.log("1");
            // // const tempUpdate = state.profileGroupID.(state.newGroupID)
            // console.log(state.profileGroupID);
            // console.log("2");
            // await dataBase.update({
            //     groupID:  tempUpdate
            // })
        


        //=== Court
        //--- Court PopUp
        async addCheckinHistory({state, dispatch}, payload) {
            // Dispatch new check in history upon clicking check in in pop-up
            // Note: This is called when there are no conflicts

            await db.collection('users').doc(state.profileID).collection("checkinHistory")
            .add({
                checkinTime: payload.dbCheckinTime,
                checkoutTime: payload.dbCheckoutTime,
                courtID: state.selectedCourt
            }).then((docRef) => {
                // We commit to store only upon successful check in so that state houses valid data only
                dispatch("getProfileLatestIO")
                console.log("[checkinHistory collection] Successfully added to firebase, docRef.id: ", docRef.id);
            }).catch((error) => {
                console.log("[checkinHistory collection] Error adding to firebase: ", error);
            })
        },

        async addConflictedCheckinHistory({state}, payload) {
            // Checkout of previously conflicted document
            // Note: Assumption is there is at max one conflict at anytime because we checkout of the previous location whenever there are conflicts
            console.log("hello");
            await db.collection('users').doc(state.profileID).collection("checkinHistory")
            .where('checkoutTime', '>', payload.dbCheckinTime) // Looks for all future check outs
            .get()
            .then((possibleConflictSnapshots) => {
                possibleConflictSnapshots.forEach((possibleConflictDoc) => {
                    if (possibleConflictDoc.data().checkinTime <= payload.dbCheckinTime){
                        // Looks for document that currently checked in to to edit check out
                        possibleConflictDoc.ref.update({
                            checkoutTime: firebase.firestore.Timestamp.now()  
                        }) 
                        console.log(`[checkinHistory collection] Successfully updated doc (${possibleConflictDoc.id}) with checkoutTime (${firebase.firestore.Timestamp.now()})`);
                    }
                })

                // Adds a new check in based on the current time of the user

            }).catch((error) => {
                console.log("[checkinHistory collection] Error adding to firestore: ", error);
            })


        },


        async getCourt({commit}, payload) {
            // state.selectedCourt
            const courtDataBaseRef = db.collection('court').doc(payload.id)
            courtDataBaseRef.get()
            .then((courtSnapshot) => {
                if (courtSnapshot.exists) {
                    commit("updateSelectedCourt", payload.id)
                } else {
                    courtDataBaseRef('court').set({
                        courtID: payload.id,
                        courtLocation: payload.latLon,
                        courtName: payload.courtName,
                        currentUsers: []
                    })
                    commit("updateSelectedCourt", payload.id)
                    console.log(`[court collection] Added new court ${payload.courtName} to firestore`);
                }
            }).catch((error) => {
                console.log("[court collection] Error adding to firestore: ", error);
            })
        }


        // // === Start of home page functions

    },

    getters: {
        // Dev tools temp
        state(state) {
          return state;
        }
    },

    modules: {

    },

});

export default store