import './PersonalInformation.scss';
import { useEffect, useState } from 'react';
import * as authService from '../../../../services/authService';
import { auth } from '../../../../utils/firebase';

const PersonalInformation = ({ user, onChangeUserInfo }) => {
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        setIsLoading(() => !user?.firstName);
        console.log(isLoading);
    }, [user]);

    const onChangeDetailsSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e.target.email.value);
        const newInfo = {
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
        };

        auth.signInWithEmailAndPassword(user?.email, e.target.password.value).then(function (userCredential) {
            userCredential.user.updateEmail(newInfo.email);
        });

        authService.update(user.id, newInfo).then((data) => onChangeUserInfo(data));
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
                    defaultValue={`${user?.firstName} ${user?.lastName}`}
                />
            </div>
            <div className="txt_field">
                <label htmlFor="date-of-birth">Date of birth</label>
                <input disabled name="date-of-birth" id="date-of-birth" placeholder="Date of birth" type="text" defaultValue={user?.dateOfBirth} />
            </div>
            <div className="txt_field">
                <label htmlFor="salary">Salary</label>
                <input disabled name="salary" id="salary" placeholder="Salary" type="text" defaultValue={user?.salary} />
            </div>
            <div className="txt_field">
                <label htmlFor="email">Email</label>
                <input name="email" id="email" placeholder="Email" type="text" defaultValue={user?.email} />
            </div>
            <div className="txt_field">
                <label htmlFor="phoneNumber">Phone number</label>
                <input name="phoneNumber" id="phoneNumber" placeholder="Phone number" type="text" defaultValue={user?.phoneNumber} />
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
