import { createStore } from 'vuex'
import db from "../firebase/firebaseInit";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';


const store = createStore({
    state: {
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
        profileCheckedInTime: null,
        profileLoggedInTime: null,
        profileActiveCourt: null,
        newGroupExp: null,
        newGroupName: null,
        newGroupID: null,
        memberID: null, // TBC
        groupName: null, // TBC
        groupEXP: null, // TBC
        groupInfo: null,
        currentMemberID: null,
        currentGroupID: null,

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

        updateUser(state,payload){
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
            state.profileCheckedInTime = doc.data().checkedInTime;
            state.profileLoggedInTime = doc.data().loggedInTime;
            state.profileActiveCourt = doc.data().activeCourt;
        },

        setGroupInfo(state,doc){
            state.groupInfo = doc
            // state.groupExp = doc.data().groupExp
            // state.memberID = doc.data().memberID
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
        
    },

    //INTERACTIONS BETWEEN STORE AND FIREBASE 
    actions: { 

        // RETRIEVE USER INFO
        async getCurrentUser({commit}){
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
            const dbResults = await dataBase.get();
            commit("setProfileInfo", dbResults);
            console.log(dbResults);
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
        

    },

    modules: {

    },

});

export default store