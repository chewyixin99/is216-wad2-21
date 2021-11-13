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

        // for Group component within publicUser
        publicUserGroupDetails: [],


        // default profile avatar, yixin, to be removed after JL implemented default avatar
        // defaultProfileImg: `https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png`,


        // == selectedCourt
        selectedCourt: `defaultValue`,
        selectedCourtCurrentUsers: [],

        // == selectedProfle
        selectedProfile:`defaultValue`,

        // Code below are added after changing of CICO direction
        checkedInCourtID: "",





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
            state.profileInitialsURL = "https://ui-avatars.com/api/?name=" + state.profileInitials + "&background=FEB842&color=fff&bold=true"
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
            state.publicUserGroupDetails = payload
        },


        updateCheckedInCourtId(state, payload) {
            state.checkedInCourtID = payload
        }

    },

    //INTERACTIONS BETWEEN STORE AND FIREBASE 
    actions: { 


        // RETRIEVE USER INFO


        async getCurrentUser({commit}){
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
            const dbResults = await dataBase.get();
            commit("setProfileInfo", dbResults);
            commit("setProfileInitials");
            commit("setProfileInitialsURL")
            console.log(dbResults);
            
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

        async addCurrentPlayer({state}){ 

            const courtDb = await db.collection('court').doc(state.checkedInCourtID)
            await courtDb.update({
                currentPlayers: firebase.firestore.FieldValue.arrayUnion(state.profileID)
            })
            .then(()=>{
                console.log("User successfully added to Current Players");
            }).catch((error) => {
                console.log("Failed to add users to Current Players. Error: ", error);
            })
                
            const userDb = await db.collection('users').doc(state.profileID);
            await userDb.update({
                checkedInCourt: state.checkedInCourtID,                
            })
            .then(()=>{
                console.log("User successfully checked in to court");
            }).catch((error) => {
                console.log("Failed to check in user to court. Error: ", error);
            })
            
        },

        async removeCurrentPlayer({state, commit}){
            const courtDb = await db.collection('court').doc(state.checkedInCourtID);
            await courtDb.update({
                currentPlayers: firebase.firestore.FieldValue.arrayRemove(state.profileID)
            })
            .then(()=>{
                console.log("User successfully removed from current players in court");
            }).catch((error) => {
                console.log("Failed to add remove from current players in court. Error: ", error);
            })            

            const userDb = await db.collection('users').doc(state.profileID);            
            await userDb.update({
                checkedInCourt: "",
            })
            .then(()=>{
                commit("updateCheckedInCourtId", "")
                console.log("User successfully checked out from court");
            }).catch((error) => {
                console.log("Failed to check out user to court. Error: ", error);
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

        async populatePublicUserGroupDetails({commit}, payload) {
            let groupDetails = []
            for (let groupID of payload) {
                const data = await db.collection('groups')
                .doc(groupID)
                .get()

                groupDetails.push({
                    groupName: data.get('groupName'),
                    groupExp: data.get('groupExp'),
                    memberID: data.get('memberID'),
                    memberObj: [],
                })
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