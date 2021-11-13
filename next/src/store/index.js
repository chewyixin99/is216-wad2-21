// Vuex persistedState imports
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


import db from "../firebase/firebaseInit";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import moment from "moment"


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
        profileFavTeam: ``,
        profileGroupID: ``,
        profileLoggedInTime: ``,
        profileInitialsURL: null,
        profileImg: null,
        profileFavPlayer: ``,
      
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




        // for Group component within publicUser
        publicUserGroupDetails: [],
        publicUserMemberObj: [],
        publicUserUpdated: false,


        // default profile avatar, yixin, to be removed after JL implemented default avatar
        defaultProfileImg: `https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png`,


        // == selectedCourt
        selectedCourt: `defaultValue`,
        selectedCourtCurrentUsers: [],

        // == selectedProfle
        selectedProfile:`defaultValue`,

        // Code below are added after changing of CICO direction
        checkedInCourtID: "",
        checkInConflict: false,


        recentlyPlayed: [],

        reloadKeys: 0,

        profileFavPlayer1: ``,
        profileFavPlayer2: ``,
        profileFavTeam1: ``,
        profileFavTeam2: ``,



    },

    mutations: { //INTERACTIONS BETWEEN STORE AND VUE
        forceRerender(state) {
            state.reloadKeys += 1
        },

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
            state.profileFavPlayer1 = doc.data().favPlayer1;
            state.profileFavPlayer2 = doc.data().favPlayer2;
            state.profileFavTeam = doc.data().favTeam;
            state.profileFavTeam1 = doc.data().favTeam1;
            state.profileFavTeam2 = doc.data().favTeam2;
            state.profileGroupID = doc.data().groupID; 
            state.profileLoggedInTime = doc.data().loggedInTime;
            state.profileImg = doc.data().profileImg;
            state.checkedInCourtID = doc.data().checkedInCourt
        },

        setProfileInitials(state){
            state.profileInitials = 
            state.profileFirstName.match(/(\b\S)?/g).join("") + 
            state.profileLastName.match(/(\b\S)?/g).join("");
        },

        setProfileInitialsURL(state){
            state.profileInitialsURL = "https://ui-avatars.com/api/?name=" + state.profileInitials + "&background=FEB842&color=fff&bold=true"
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

        changeFavPlayer1(state, payload) {
            state.profileFavPlayer1 = payload;
        },
        changeFavPlayer2(state, payload) {
            state.profileFavPlayer2 = payload;
        },

        changeFavPlayer(state, payload) {
            state.profileFavPlayer = payload;
        },


        changeFavTeam1(state, payload) {
            state.profileFavTeam1 = payload;
        },
        changeFavTeam2(state, payload) {
            state.profileFavTeam2 = payload;
        },


        changeExperience(state, payload) {
            state.profileExperience = payload;
        },
        changeFlag(state, payload) {
            state.isflag = payload;
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
            // console.log(state)
            // console.log(payload)
        },

        deleteBookmark(state, payload) {
            const index = state.profileBookmarksID.indexOf(payload.id)
            // console.log(`index below`)
            // console.log(index)
            // console.log(state.profileBookmarks)
            // console.log(state.profileBookmarksID)
            // console.log(payload.id)
            state.profileBookmarks.splice(index, 1)
            state.profileBookmarksID.splice(index, 1)
        },
        
        updateSelectedCourtCurrentUsers(state, payload) {
            state.selectedCourtCurrentUsers = payload
        },

        populatePublicUserGroupDetails(state, payload) {
            console.log(`=== from populatePublicUserGroupDetails mutation ===`)
            // console.log(state.publicUserGroupDetails)
            state.publicUserGroupDetails = payload
            // console.log(state.publicUserGroupDetails)
            state.publicUserUpdated = true
        },

        setPublicUserUpdated(state, payload) {
            state.publicUserUpdated = payload
        }, 


        updateCheckedInCourtId(state, payload) {
            state.checkedInCourtID = payload
        },

        getRecentlyPlayed(state, payload) {
            state.recentlyPlayed = payload
        },

        toggleCheckInConflict(state) {
            if (state.checkInConflict) {
                state.checkInConflict = false
            } else {
                state.checkInConflict = true
            }
        }

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
            
            dispatch('getRecentlyPlayed')
        },

        async addTeam({state}){ 

            const numTeams = await db.collection('court').doc(state.selectedCourt.id).collection('courtTeams')
            .get().then(snap=>{ 
                return snap.size})

            
            await db.collection('court').doc(state.selectedCourt.id).collection('courtTeams')
            .add({

                teamName: "Team " + (numTeams + 1) ,
                teamMembers: [state.profileID]

            })
                
                            
        },

        // Check in
        async addCurrentPlayer({state, dispatch}){ 

            const courtDb = await db.collection('court').doc(state.checkedInCourtID)
            await courtDb.update({
                currentPlayers: firebase.firestore.FieldValue.arrayUnion(state.profileID)
            })
            .then(()=>{
                console.log(`User successfully added to Current Players in court (${state.checkedInCourtID})`);
            }).catch((error) => {
                console.log(`Failed to add users to Current Players in court (${state.checkedInCourtID}). Error: `, error);
            })
                
            const userDb = await db.collection('users').doc(state.profileID);
            await userDb.update({
                checkedInCourt: state.checkedInCourtID,                
            })
            .then(()=>{
                dispatch('addCheckInHistory')
                console.log(`User successfully checked in to court (${state.checkedInCourtID})`);
            }).catch((error) => {
                console.log(`Failed to check in user to court (${state.checkedInCourtID}). Error: `, error);
            })
            
        },

        // Check out
        async removeCurrentPlayer({state, commit, dispatch}){
            const courtDb = await db.collection('court').doc(state.checkedInCourtID);
            await courtDb.update({
                currentPlayers: firebase.firestore.FieldValue.arrayRemove(state.profileID)
            })
            .then(()=>{
                console.log(`User successfully removed from current players in court (${state.checkedInCourtID})`);
            }).catch((error) => {
                console.log(`Failed to add remove from current players in court (${state.checkedInCourtID}). Error: `, error);
            })            

            const userDb = await db.collection('users').doc(state.profileID);            
            await userDb.update({
                checkedInCourt: "",
            })
            .then(()=>{
                dispatch('addCheckOutHistory')
                dispatch('updateRecentlyPlayed', moment().toDate())
                commit("updateCheckedInCourtId", "")
                console.log(`User successfully checked out from court (${state.checkedInCourtID})`);
            }).catch((error) => {
                console.log(`Failed to check out user to court (${state.checkedInCourtID}). Error: `, error);
            })
        },

        // Check in history
        // Whenever the check in, input a check in history to the user's history
        // include, checkintime = current time, check out time default 2 hrs
        async addCheckInHistory({state}) {
            let checkInTime = moment().toDate()
            let checkOutTime = moment().add(2, 'hours').toDate()

            const checkInDb = await db.collection('users').doc(state.profileID).collection('checkInHistory')
            await checkInDb.add({
                checkInTime: checkInTime,
                checkOutTime: checkOutTime,
                courtInfo: state.selectedCourt,
            }).then(() => {
                console.log(`Successfully added to user check in history.`);
            }).catch((error) => {
                console.log(`Failed to add check to user check in history. Error: ${error}`);
            })
        },

        // Check out history
        // when the user check out, go retrieve the latest check in from check in history and update checkout to current time
        async addCheckOutHistory({state}) {
            let checkOutTime = moment().toDate()

            const checkInDb = await db.collection('users').doc(state.profileID).collection('checkInHistory')
            // Retrieve the latest check in, should only have 1
            await checkInDb.orderBy("checkInTime", "desc").limit(1)
            .get()
            .then((latestCheckIn) => {
                latestCheckIn.docs[0].ref.update({
                    checkOutTime: checkOutTime
                }).then(() => {
                    console.log(`Successfully checked out of user check in history.`);
                }).catch((error) => {
                    console.log(`Failed to check out of user check in history. Error: ${error}`);
                })
            })
        },

        // Recently played
        async getRecentlyPlayed({state, commit}) {
            let recentlyPlayedIDs = []
            let allRecentlyPlayedInfo = []
            
            const recentlyPlayedDb = await db.collection('users').doc(state.profileID).collection('recentlyPlayed')
            await recentlyPlayedDb.orderBy('timePlayed', "desc").limit(1)
            .get()
            .then((recentlyPlayedDocs) => {
                recentlyPlayedIDs = recentlyPlayedDocs.docs[0].data().recentlyPlayed
            }) 

            const userDb = await db.collection('users')
            await userDb.where(firebase.firestore.FieldPath.documentId(), 'in', recentlyPlayedIDs)
            .get()
            .then((recentlyPlayedInfo) => {
                recentlyPlayedInfo.forEach((recentlyPlayedData) => {
                    let userInfo = {
                        firstName: recentlyPlayedData.data().firstName,
                        lastName: recentlyPlayedData.data().lastName,
                        profileImg: recentlyPlayedData.data().profileImg,
                        email: recentlyPlayedData.data().email,
                        experience: recentlyPlayedData.data().experience,
                        favPlayer: recentlyPlayedData.data().favPlayer,
                        favTeam: recentlyPlayedData.data().favTeam,
                        groupID: recentlyPlayedData.data().groupID
                    }

                    allRecentlyPlayedInfo.push(userInfo)
                })

                commit('getRecentlyPlayed', allRecentlyPlayedInfo)
            })
        },


        async updateRecentlyPlayed({state}, checkOutTime) {
            let recentlyPlayed = []

            const courtDoc = await db.collection('court').doc(state.checkedInCourtID)
            await courtDoc.get()
            .then((courtData) => {
                recentlyPlayed = courtData.data().currentPlayers
            })

            if (recentlyPlayed.length > 0) {
                const recentlyPlayedDb = await db.collection('users').doc(state.profileID).collection('recentlyPlayed')
                await recentlyPlayedDb.add({
                    timePlayed: checkOutTime,
                    courtInfo: state.selectedCourt,
                    recentlyPlayed: recentlyPlayed,
                }).then(() => {
                    console.log(`Successfully added users to recently played.`);
                }).catch((error) => {
                    console.log(`Failed to add users to recently played. Error: ${error}`);
                })
            }
        },


        // UPDATE USER INFO FOR ONBOARDING, PROFILE PAGE

        async updateUserSettings({state}){
            const dataBase = await db.collection('users').doc(state.profileID);
            await dataBase.update({
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                favPlayer1: state.profileFavPlayer1,
                favPlayer2: state.profileFavPlayer2,
                favTeam1: state.profileFavTeam1,
                favTeam2: state.profileFavTeam2,
                experience: state.profileExperience,
            })
            .then(()=>{
                console.log("User Profile is updated.");
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

        async populatePublicUserGroupDetails({commit}, payload) {
            console.log(` === from populatePublicUserGroupDetails dispatch === `)
            let groupDetails = []
            for (let groupID of payload) {
                const data = await db.collection('groups')
                .doc(groupID)
                .get()

                groupDetails.push({
                    groupName: data.get('groupName'),
                    groupExp: data.get('groupExp'),
                    groupImg: data.get('groupImg'),
                    groupImgDefault: data.get('groupImgDefault'),
                    memberID: data.get('memberID'),
                    memberObj: [],
                })
            }
            // console.log(` 2nd for loop below `)
            for (let i in groupDetails) {
                let memberID = groupDetails[i].memberID
                groupDetails[i].memberObj = []
                for (let id of memberID) {
                    await firebase
                    .firestore()
                    .collection('users')
                    .doc(id)
                    .get()
                    .then(r => {
                        let singleMember = {
                            initials: `${r.get('firstName').charAt(0)}${r.get('lastName').charAt(0)}`,
                            username: `${r.get('firstName')} ${r.get('lastName')}`,
                            profileImg: r.get('profileImg'),
                            firstName: r.get('firstName'),
                            lastName: r.get('lastName'),
                            experience: r.get('experience'),
                            email: r.get('email'),
                            favPlayer: r.get('favPlayer'),
                            favTeam: r.get('favTeam'),
                            groupID: r.get('groupID'),
                            docID: r.id,
                        }
                        if (groupDetails[i].memberObj.indexOf(singleMember)) groupDetails[i].memberObj.push(singleMember)
                    }).catch(e => console.log(e))
                }
            }
            
            commit('populatePublicUserGroupDetails', groupDetails)
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
                        currentPlayers: "",
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