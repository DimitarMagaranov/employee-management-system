import { useEffect, useState } from 'react';
import * as apiService from '../../../../services/apiService';
import { auth } from '../../../../utils/firebase';
import './PersonalInformation.scss';

const PersonalInformation = ({ userInfo, onChangeUserInfo }) => {
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(() => !userInfo?.firstName);
    }, [userInfo]);

    const onChangeDetailsSubmitHandler = (e) => {
        e.preventDefault();
        const newInfo = {
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
        };

        auth.signInWithEmailAndPassword(userInfo?.email, e.target.password.value).then(function (userCredential) {
            userCredential.userInfo.updateEmail(newInfo.email);
        });

        apiService.updateEmployee(userInfo.id, newInfo).then((data) => onChangeUserInfo(data));
    };

    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <form id="personal-info-form" onSubmit={onChangeDetailsSubmitHandler}>
            <div className="txt_field">
                <label htmlFor="fullName">Full name</label>
                <input
                    disabled
                    name="fullName"
                    id="fullName"
                    placeholder="Full name"
                    type="text"
                    defaultValue={`${userInfo?.firstName} ${userInfo?.lastName}`}
                />
            </div>
            <div className="txt_field">
                <label htmlFor="date-of-birth">Date of birth</label>
                <input
                    disabled
                    name="date-of-birth"
                    id="date-of-birth"
                    placeholder="Date of birth"
                    type="text"
                    defaultValue={userInfo?.dateOfBirth}
                />
            </div>
            {!userInfo?.isNew && (
                <div className="txt_field">
                    <label htmlFor="salary">Salary</label>
                    <input disabled name="salary" id="salary" placeholder="Salary" type="text" defaultValue={userInfo?.salary} />
                </div>
            )}
            <div className="txt_field">
                <label htmlFor="email">Email</label>
                <input name="email" id="email" placeholder="Email" type="text" defaultValue={userInfo?.email} />
            </div>
            <div className="txt_field">
                <label htmlFor="phoneNumber">Phone number</label>
                <input name="phoneNumber" id="phoneNumber" placeholder="Phone number" type="text" defaultValue={userInfo?.phoneNumber} />
            </div>
            <div className="txt_field">
                <label htmlFor="phoneNumber">Enter your password to change the details</label>
                <input name="password" id="password" placeholder="Password" type="password" />
            </div>
            <input type="submit" value="Change" />
        </form>
    );
};

export default PersonalInformation;
