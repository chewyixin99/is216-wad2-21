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
        groupMsg: ``,
        currentMemberID: ``,
        currentGroupID: ``,



        profileActiveCourt: ``,
        profileMostRelevantCourtID: ``,
        profileMostRelevantCheckin: ``,
        profileMostRelevantCheckout: ``,


        // default profile avatar, yixin, to be removed after JL implemented default avatar
        // defaultProfileImg: `https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png`,

        //=== Court
        //--- Court PopUp
        courtShowCheckinModal: false,

        // == selectedCourt
        selectedCourt: `defaultValue`,
        selectedCourtCurrentUsers: [],

        // == selectedProfle
        selectedProfile:`defaultValue`,


        checkedInCourtID: ""




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

        // == Update state: profileBookmarks

        getBookmarks(state, payload) {
            console.log(`=== getBookmarks mutation ===`)
            state.profileBookmarks = payload
            let profileBookmarksID = []
            for( let b of payload) {
                profileBookmarksID.push(b.id)
            }
            state.profileBookmarksID = profileBookmarksID
        },

        addBookmark(state, payload) {
            state.profileBookmarks.push(payload)
            state.profileBookmarksID.push(payload.id)
        },

        deleteBookmark(state, payload) {
            const indexBookmark = state.profileBookmarks.indexOf(payload)
            state.profileBookmarks.splice(indexBookmark, 1)
            const indexBookmarkID = state.profileBookmarks.indexOf(payload)
            state.profileBookmarksID.splice(indexBookmarkID, 1)
        },
        
        updateSelectedCourtCurrentUsers(state, payload) {
            state.selectedCourtCurrentUsers = payload
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
            
            dispatch("getProfileLatestIO")
        },

        // *****************************************************************
        async addCurrentPlayer({state}){ 

            const dataBase = await db.collection('court').doc(state.checkedInCourtID).get()
            
                const currentPlayers= dataBase.data().currentPlayers

                const compilation1 = [];
                for (var i = 0; i < currentPlayers.length; i++){
                    if (currentPlayers[i] != "" && currentPlayers[i] != state.profileID){
                        compilation1.push(currentPlayers[i]);
                    }
                    
                }
                compilation1.push(state.profileID)

                console.log(compilation1);


            const dataBase2 = await db.collection('court').doc(state.checkedInCourtID);
            
            await dataBase2.update({

                currentPlayers: compilation1
                
            })
            .then(()=>{
                console.log("User successfully added to Current Players");
            })
                

            const dataBase4 = await db.collection('users').doc(state.profileID);
            
            await dataBase4.update({

                checkedInCourt: state.checkedInCourtID,
                
            })
            .then(()=>{
                console.log("User successfully checked in to court");
            })
            
        },

        async removeCurrentPlayer({state}){

            const dataBase = await db.collection('users').doc(state.profileID);
            
            await dataBase.update({

                checkedInCourt: "",
                
            })
            .then(()=>{
                console.log("User successfully checked out from court");
            })

            const dataBase3 = await db.collection('court').doc(state.checkedInCourtID).get()
            
            const currentPlayers = dataBase3.data().currentPlayers
                
                const compilation = [];

                for (var j = 0; j < currentPlayers.length; j++){
                    if (currentPlayers[j] != ""){
                        compilation.push(currentPlayers[j]);
                        console.log(currentPlayers[j]);
                    }
                    
                }
                let index = compilation.indexOf(state.profileID)
                compilation.splice(index,1)


            const dataBase4 = await db.collection('court').doc(state.checkedInCourtID);
            
            await dataBase4.update({

                currentPlayers: compilation,
                
            })
            .then(()=>{
                console.log("User successfully removed from current players in court");
            })
            
        },

        async getProfileLatestIO({state, commit, dispatch}) {
            // Gets the most relevant history
            let currentTime = firebase.firestore.Timestamp.now()
            let payload = {}
            let isActive = false

            // 1. Check for any current ACTIVE check ins
            await db.collection('users').doc(state.profileID).collection("checkinHistory")
            .where('checkoutTime', '>', currentTime) // Looks for all checkouts that haven't occured (if user has current booking)
            .get()
            .then((possibleActiveTimeslots) => {
                possibleActiveTimeslots.forEach((possibleActiveTimeslotsDoc) => {
                    // Assumption is we only allow 1 ACTIVE check in at all times in DB
                    if (possibleActiveTimeslotsDoc.data().checkinTime <= currentTime){ // Looks for check in that are smaller than current time (user currently active)
                        payload["activeCourt"] = possibleActiveTimeslotsDoc.data().courtID
                        payload["mostRelevantCourtID"] = possibleActiveTimeslotsDoc.data().courtID
                        payload["mostRelevantCheckinTime"] = possibleActiveTimeslotsDoc.data().checkinTime.toDate()
                        payload["mostRelevantCheckoutTime"] = possibleActiveTimeslotsDoc.data().checkoutTime.toDate()
                        
                        isActive = true
                        // Commits the most relevant information
                        commit("setProfileLatestCheckIO", payload)
                        // Dispatches to current court that user is active in
                        dispatch("courtActiveUserCheckin")

                        console.log(`[checkinHistory collection] User is currently active.`);
                    }
                })
            }).catch((error) => {
                console.log("[checkinHistory collection] Error adding to firebase: ", error);
            })

        
            // 2. If there are NO ACTIVE courts, we take the latest booking as the most relevant one
            if (!isActive) {
                await db.collection('users').doc(state.profileID).collection("checkinHistory").orderBy("checkoutTime", "desc").limit(1)
                .get().then(
                    (latestCheckoutDoc) => {
                        if (latestCheckoutDoc.docs) {
                            payload["activeCourt"] = null
                            payload["mostRelevantCourtID"] = latestCheckoutDoc.docs[0].data().courtID
                            payload["mostRelevantCheckinTime"] = latestCheckoutDoc.docs[0].data().checkinTime.toDate()
                            payload["mostRelevantCheckoutTime"] = latestCheckoutDoc.docs[0].data().checkoutTime.toDate()
                            
                            // Commits the most relevant information
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

        async courtActiveUserCheckin({state}) {
            // Search for the courtID of the ACTIVE court of the current user
            const activeUserInfo = db.collection('court').doc(state.profileActiveCourt.id).collection('currentUsers').doc(state.profileID)
            await activeUserInfo.set({
                profileID: state.profileID,
                profileInitials: state.profileInitials,
            }).then(() => {                    
                console.log(`[courtActiveUserCheckin] User checked in to active court (${state.profileActiveCourt.id}) in firestore.`);
            }).catch((error) => {
                console.log(`[courtActiveUserCheckin] Error getting active court (${state.profileActiveCourt.id}) from firestore. Error: ${error}`);
            })
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
        
        // UPDATE USER INFO FOR ONBOARDING, PROFILE PAGE
        async updateImg({state}){
            const dataBase = await db.collection('users').doc(state.profileID);
            await dataBase.update({
                initialsURL: state.profileInitialsURL,
                profileImg: state.profileImg,
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

                groupID: compilation1
                
            })
            .then(()=>{
                console.log("GroupID successfully added to Users");
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
            .then(()=>{
                console.log("Members list successfully updated in Groups");
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
            .then(()=>{
                console.log("GroupID successfully removed from Users");
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
            .then(()=>{
                console.log("GroupID successfully removed from Groups");
            })
            
        },
        
        // ADD A NEW GROUP TO DATABASE AND ADD GROUP ID TO USER INFO
        async addNewGroup({state}){
            const dataBase = await db.collection("groups").add({
                groupName: state.newGroupName,
                groupExp: state.newGroupExp,
                memberID: [state.profileID],
                groupImg: null,
                groupImgDefault: "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png",
            })

                state.profileGroupID = compilation
                console.log("New group successfully created");


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
            .then(()=>{
                state.profileGroupID = compilation
                console.log("New group successfully added to Users");
            })

            
        },    

        async bookmarkCourt({state, commit}, payload) {
            console.log(`=== dispatch bookmarkCourt ===`)
            // console.log(state.selectedCourt)
            const data = await db.collection('users')
                .doc(state.profileID)
                .collection('bookmarkedCourts')
                .where('courtID', '==', state.selectedCourt.id)
                .get()

            if (data.docs.length > 0) {
                
                commit("deleteBookmark", payload)
                
                data.docs[0].ref.delete()
                console.log(`document deleted`)
                
            } else {
                const lat = state.selectedCourt.location.lat
                const lng = state.selectedCourt.location.lng

                commit("addBookmark", payload)
                
                db.collection('users')
                    .doc(state.profileID)
                    .collection('bookmarkedCourts')
                    .add({
                        courtID: state.selectedCourt.id,
                        name: state.selectedCourt.name,
                        vicinity: state.selectedCourt.vicinity,
                        location: new firebase.firestore.GeoPoint(lat, lng)
                    })
                
                console.log('document created with the following attributes')
                console.log(state.selectedCourt)
            }
        },

        async getBookmarks({state, commit}) {
            let bookmarks = []
            const data = await db.collection('users')
                .doc(state.profileID)
                .collection('bookmarkedCourts')
                .get()

            for(let courtDoc of data.docs) {
                const lat = courtDoc.get('location')._lat
                const lng = courtDoc.get('location')._long
                let court = {
                    name: courtDoc.get('name'),
                    id: courtDoc.get('courtID'),
                    location: {'lat': lat, 'lng': lng},
                    vicinity: courtDoc.get('vicinity'),
                }
                bookmarks.push(court)
            }
            commit('getBookmarks', bookmarks)
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
            // User is currently NOT ACTIVE at any court
            // Check for any FUTURE bookings that coincide with this booking and override if there are any
            const checkinHistoryDbRef = db.collection('users').doc(state.profileID).collection("checkinHistory")

            checkinHistoryDbRef.where('checkinTime', '<', payload.dbCheckoutTime) // Looks for all FUTURE check ins
            .get()
            .then((possibleConflictSnapshots) => {
                possibleConflictSnapshots.forEach((possibleConflictDoc) => {
                    // Conflict occurs where checkout of document is bigger than checkin of payload (ensures no delete of past check ins)
                    if (possibleConflictDoc.data().checkoutTime.toDate() > payload.dbCheckinTime) {
                        // Deletes any possible conflicts
                        possibleConflictDoc.ref.delete()
                        .then(
                            console.log("[addCheckinHistory] Deleted document with conflicting check in time.")
                        ).catch((error) => {
                            console.log("[addCheckinHistory] Error deleting conflicting document from firestore: ", error);
                        })
                    }
                })
                
                // Adds current check in attempt
                checkinHistoryDbRef.add({
                    courtID: state.selectedCourt,
                    checkinTime: payload.dbCheckinTime,
                    checkoutTime: payload.dbCheckoutTime,
                }).then((newCheckInDocRef) => {
                    // Dispatch a request to look for new most relevant court
                    dispatch("getProfileLatestIO")
                    console.log("[addCheckinHistory] Successfully added new check in to firebase, docRef.id: ", newCheckInDocRef.id);
                }).catch((error) => {
                    console.log("[addCheckinHistory] Error adding new check in to firebase: ", error);
                })
                                
            }).catch((error) => {
                console.log("[addCheckinHistory] Error adding to firestore: ", error);
            })
        },

        async addConflictedCheckinHistory({state, dispatch}, payload) {
            // Conflict occurs if ACTIVE at a current court
            // Checkout of ACTIVE court and check in to new entry upon prompt
            const checkinHistoryDbRef =  db.collection('users').doc(state.profileID).collection("checkinHistory")
            checkinHistoryDbRef.where('checkoutTime', '>', payload.dbCheckinTime)
            .get()
            .then((possibleConflictSnapshots) => {
                possibleConflictSnapshots.forEach((possibleConflictDoc) => {
                    if (possibleConflictDoc.data().checkinTime.toDate() <= payload.dbCheckinTime){
                        // Looks for document that currently checked in to to edit check out
                        possibleConflictDoc.ref.update({
                            checkoutTime: payload.dbCheckinTime
                        }) 
                        console.log(`[addConflictedCheckinHistory] Successfully updated doc (${possibleConflictDoc.id}) with checkoutTime (${payload.dbCheckinTime})`);
                    }
                })

                // Adds a new check in based on the current time of the user
                checkinHistoryDbRef.add({
                    courtID: state.selectedCourt,
                    checkinTime: payload.dbCheckinTime,
                    checkoutTime: payload.dbCheckoutTime,
                }).then((newCheckInDocRef) => {
                    // Dispatch a request to look for new most relevant court
                    dispatch("getProfileLatestIO")
                    console.log("[addCheckinHistory] Successfully added new check in to firebase, docRef.id: ", newCheckInDocRef.id);
                }).catch((error) => {
                    console.log("[addCheckinHistory] Error adding new check in to firebase: ", error);
                })

            }).catch((error) => {
                console.log("[addConflictedCheckinHistory] Error adding to firestore: ", error);
            })


        },

        async updateSelectedCourtCurrentUsers ({state, commit}) {
            let payload = []
            let currentTime = firebase.firestore.Timestamp.now()

            // Get all currentUsers in court collection
            const allCurrentUsersInfoDb = db.collection('court').doc(state.selectedCourt.id).collection('currentUsers')
            
            allCurrentUsersInfoDb.get()
            .then((allCurrentUsersDocs) => {
                // Look at each current user on the court
                allCurrentUsersDocs.forEach((aCurrentUserInfoDoc) => {
                    let aCurrentUserCheckinDb = db.collection('users').doc(aCurrentUserInfoDoc.data().profileID).collection('checkinHistory')
                    
                    // Check user's history to see if user is actually ACTIVE on court
                    aCurrentUserCheckinDb.where('checkoutTime', '>', currentTime)
                    .get()
                    .then((validDocumentsSnapshot) => {validDocumentsSnapshot.forEach((validDoc) => {
                        if(validDoc.data().checkinTime < currentTime) {
                            // Add user info if check in valid to payload to commit to store to display on court
                            payload.push(aCurrentUserInfoDoc.data())
                        } else {
                            // Delete user document if the user is no longer active at the court
                            allCurrentUsersInfoDb.doc(aCurrentUserInfoDoc.id).delete().then(() => {
                                console.log(`[updateSelectedCourtCurrentUsers] Deleted inactive user on selected court (${state.selectedCourt.id}) in firestore.`);
                            }).catch((error) => {
                                console.log(`[updateSelectedCourtCurrentUsers] Error deleting inactive user from selected court (${state.selectedCourt.id}) from firestore. Error: ${error}`);
                            })
                        }
                    })
                    })
                })

                // Commit payload to selectedCourtCurrentUsers state for client to view
                commit("updateSelectedCourtCurrentUsers", payload)

                console.log(`[updateSelectedCourtCurrentUsers] Retrieved current users on selected court (${state.selectedCourt.id}) in firestore.`);

            }).catch((error) => {
                console.log(`[updateSelectedCourtCurrentUsers] Error getting current users from selected court (${state.selectedCourt.id}) from firestore. Error: ${error}`);
            })        
        },


        async getCourt({commit}, payload) {
            // state.selectedCourt
            console.log('=== start of getCourt action dispatch ===')
            const lat = payload.location.lat()
            const lng = payload.location.lng()
            let courtCollection = db.collection('court')
            await courtCollection
            .doc(payload.id)
            .get()
            .then((courtSnapshot) => {
                if (courtSnapshot.exists) {
                    commit("updateSelectedCourt", payload)
                } else {
                    courtCollection.doc(payload.id).set({
                        courtID: payload.id,
                        courtLocation: new firebase.firestore.GeoPoint(lat, lng),
                        courtName: payload.name,
                        courtVicinity: payload.vicinity,
                    }).then(() => {                    
                        console.log(`[getCourt] Added new court ${payload.name} to firestore`);
                    }).catch((error) => {
                        console.log("[getCourt] Error adding to firestore: ", error);
                    })
                    commit("updateSelectedCourt", payload)
                    console.log('=== end of getCourt action dispatch ===')
                }
            }).catch((error) => {
                console.log("[getCourt] Error pulling document from firestore: ", error);
                console.log('=== end of getCourt action dispatch ===')
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