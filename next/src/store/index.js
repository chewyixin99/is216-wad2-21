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
      
        profileActiveCourt: ``,
        newGroupExp: ``,
        newGroupName: ``,
        newGroupID: ``,
        memberID: ``, // TBC
        groupName: ``, // TBC
        groupEXP: ``, // TBC
        groupInfo: ``,
        currentMemberID: ``,
        currentGroupID: ``,



        profileLatestCourtID: ``,
        profileLatestCheckin: ``,
        profileLatestCheckout: ``,


        // default profile avatar
        defaultProfileImg: `https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png`,

        //=== Court
        //--- Court PopUp
        courtCheckinHidden: true,

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
        
        setprofileLatestCheckOut(state, payload) {
            state.profileLatestCheckin = payload.latestCheckinTime
            state.profileLatestCheckout = payload.latestCheckoutTime
            state.latestCourtID = payload.latestCourtID

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
            

            dispatch("getProfileLatestCheckout")
        },

        async getProfileLatestCheckout({state, commit}) {
            console.log(state.user);
            console.log("state user");
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


        // === Start of home page functions

    },

    modules: {

    },

});

export default store