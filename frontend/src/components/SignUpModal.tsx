import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setSignUpStep, login,logout } from '../store';
import { SocialIcon } from 'react-social-icons';
import { Auth } from 'aws-amplify';

interface Props {
  onSignUpClose: () => void;
}
export default function SignUpModal({ onSignUpClose }: Props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [revealPassword, setRevealPassword] = React.useState(false);
  const [birthdate, setBirthdate] = React.useState('');
  const [recommendations, setRecommendations] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState('');

  const { signUpStep } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
    if (e.code === 'Escape') {
      onSignUpClose();
    }
  };

  const resendVerificationCode = async () => {
    try {
      await Auth.resendSignUp(email);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  };

  const SignUpHandler = async () => {
    try {
      const user = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: name
        }
      });
      dispatch(setSignUpStep(5));
    } catch (error) {
      alert('error signing up');
    }
  };
  const signIn = async () => {
    try {
      const user = await Auth.signIn(email, password);
      console.log(user);
      dispatch(login(user));
      navigate('/home');
    } catch (error) {
      dispatch(logout());
      console.log('error signing in', error);
    }
  };

  const confirmUserSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, verificationCode);
      signIn();
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  };

  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center ">
        <div
          className="absolute w-full h-full bg-gray-900 opacity-50"
          onClick={onSignUpClose}
          onKeyDown={handleEscape}
        ></div>
        <div className="modal-main bg-white w-11/12 max-w-md mx-auto rounded-lg z-50 overflow-y-auto place-self-center max-h-full">
          {signUpStep === 1 && (
            <>
              <div className="pl-1 pr-4 py-1 h-12">
                <button
                  className={`rounded-full bg-blue font-bold text-white mt-2 p-1 pl-3 pr-3 relative right-0 float-right hover:bg-darkblue  + ${
                    !name || !email || !birthdate
                      ? 'opacity-50 cursor-not-allowed'
                      : 'opacity-100 cursor-pointer'
                  }`}
                  disabled={!name || !email || !birthdate}
                  onClick={() => dispatch(setSignUpStep(2))}
                >
                  Next
                </button>

                <SocialIcon
                  network="twitter"
                  className=" fab fa-twitter text-blue text-2xl "
                />
              </div>
              <div className="pt-5 px-8">
                <form>
                  <div className="flex justify-between items-center pb-8">
                    <p className="text-2xl font-bold">Create your account</p>
                  </div>
                  <div className="w-full bg-lightblue border-b-2 border-dark mb-8 p-2">
                    <label className="text-dark">Name</label>
                    <input
                      className="w-full bg-lightblue text-lg"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="w-full bg-lightblue border-b-2 border-dark mb-8 p-2">
                    <p className="text-dark">Email</p>
                    <input
                      className="w-full bg-lightblue text-lg"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <p className="font-bold">Date of birth</p>
                  <p className="text-dark">
                    This will not be shown publicly. Confirm your own age, even
                    if this account is for a business, a pet, or something else.
                  </p>
                  <div className="w-full bg-lightblue border-b-2 border-dark mb-8 p-2">
                    <input
                      className="w-full bg-lightblue text-lg"
                      type="text"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </>
          )}

          {signUpStep === 2 && (
            <>
              <div className="pl-1 pr-4 py-1 h-12">
                <button
                  className="absolute rounded-full p-2 pl-3 hover:bg-lightblue"
                  onClick={() => dispatch(setSignUpStep(1))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-blue"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
                <button
                  className="rounded-full bg-blue font-bold text-white mt-2 p-1 pl-3 pr-3 relative right-0 float-right hover:bg-darkblue"
                  onClick={() => dispatch(setSignUpStep(3))}
                >
                  Next
                </button>
              </div>
              <div className="pt-5 px-8">
                <div className="flex justify-between items-center pb-8">
                  <p className="text-2xl font-bold">
                    Customize your experience
                  </p>
                </div>

                <div className="mt-5 mb-8">
                  <p className="font-bold text-xl mb-1">
                    Get more out of Twitter
                  </p>
                  <div className="flex justify-between items-top">
                    <p>
                      Receive email about your Twitter activity and
                      recommendations.
                    </p>
                    <input
                      className="mt-1 ml-2 mr-2"
                      type="checkbox"
                      checked={recommendations}
                      onChange={(e) => setRecommendations(e.target.checked)}
                    />
                  </div>
                </div>

                <div className="mt-5 mb-8">
                  <p className="font-bold text-xl mb-1">
                    Connect with people you know
                  </p>
                  <div className="flex justify-between items-top">
                    <p>
                      Let others find your Twitter account by your email
                      address.
                    </p>
                    <input className="mt-1 ml-2 mr-2" type="checkbox" />
                  </div>
                </div>

                <div className="mt-5 mb-5">
                  <p className="font-bold text-xl mb-1">Personalized ads</p>
                  <div className="flex justify-between items-top">
                    <p>
                      You will always see ads on Twitter based on your Twitter
                      activity. When this setting is enabled, Twitter may
                      further personalise ads from Twitter advertisers, on and
                      off Twitter, by combining your Twitter activity with other
                      online activity and information from our partners.
                    </p>
                    <input className="mt-1 ml-2 mr-2" type="checkbox" />
                  </div>
                </div>
              </div>
            </>
          )}

          {signUpStep === 3 && (
            <>
              <div className="pl-1 pr-4 py-1 h-12">
                <button
                  className={`absolute rounded-full p-2 pl-3 hover:bg-lightblue `}
                  onClick={() => dispatch(setSignUpStep(2))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-blue"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
                <button
                  className={`rounded-full bg-blue font-bold text-white mt-2 p-1 pl-3 pr-3 relative right-0 float-right hover:bg-darkblue
                  + ${
                    password.length < 8
                      ? 'opacity-50 cursor-not-allowed'
                      : 'opacity-100 cursor-pointer'
                  }
                  `}
                  disabled={password.length < 8}
                  onClick={() => dispatch(setSignUpStep(4))}
                >
                  Next
                </button>
              </div>
              <div className="pt-5 px-8">
                <div className="flex justify-between items-center pb-4">
                  <p className="text-2xl font-bold">You'll need a password</p>
                </div>

                <p className="text-dark mb-2">
                  Make sure it's 8 characters or more.
                </p>

                <div className="w-full bg-lightblue border-b-2 border-dark p-2">
                  <p className="leading-tight text-dark">Password</p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-lightblue text-lg"
                    type={`${revealPassword ? 'text' : 'password'}`}
                  />
                </div>
                <button
                  onClick={() => setRevealPassword(!revealPassword)}
                  className="text-blue pl-2"
                >
                  Reveal password
                </button>
              </div>
            </>
          )}

          {signUpStep === 4 && (
            <>
              <div className="pl-1 pr-4 py-1 h-12">
                <button
                  className="absolute rounded-full p-2 pl-3 hover:bg-lightblue"
                  onClick={() => dispatch(setSignUpStep(3))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-blue"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
                <p className="flex items-start ml-12 p-2 text-xl font-extrabold">
                  Step 4 of 5
                </p>
              </div>
              <div className="pt-5 px-8">
                <div className="flex justify-between items-center pb-8">
                  <p className="text-2xl font-bold">Create your account</p>
                </div>

                <div className="w-full bg-lightblue border-b-2 border-dark mb-6 p-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-2 bg-lightblue text-lg"
                    type="text"
                  />
                </div>
                <div className="w-full bg-lightblue border-b-2 border-dark mb-6 p-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 bg-lightblue text-lg"
                    type="text"
                  />
                </div>
                <div className="w-full bg-lightblue border-b-2 border-dark mb-16 p-2">
                  <input
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full py-2 bg-lightblue text-lg"
                    type="text"
                  />
                </div>

                <p>
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-blue">
                    Terms
                  </a>
                  ,{' '}
                  <a href="#" className="text-blue">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue">
                    Cookie Use
                  </a>
                  .
                </p>
                <button
                  className="w-full rounded-full mt-4 py-3 bg-blue text-white font-bold hover:bg-darkblue"
                  onClick={SignUpHandler}
                >
                  Sign up
                </button>
              </div>
            </>
          )}

          {signUpStep === 5 && (
            <>
              <div className="pl-1 pr-4 py-1 h-12">
                <button
                  onClick={confirmUserSignUp}
                  className={`rounded-full bg-blue font-bold text-white mt-2 p-1 pl-3 pr-3 relative 
            right-0 float-right hover:bg-darkblue + ${
              !verificationCode ? 'opacity-50 cursor-not-allowed' : ''
            }`}
                >
                  Next
                </button>
                <SocialIcon
                  network="twitter"
                  className="flex justify-center fab fa-twitter text-blue text-2xl mt-2 mb-8"
                />
                <div className="pt-5 px-8">
                  <div className="flex justify-between items-center pb-4">
                    <p className="text-2xl font-bold">
                      We sent you a code for {email}
                    </p>
                  </div>

                  <div className="w-full bg-lightblue border-b-2 border-dark p-2">
                    <p className="leading-tight text-dark">Verification code</p>
                    <input
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full bg-lightblue text-lg"
                      type="text"
                    />
                  </div>

                  <button
                    onClick={resendVerificationCode}
                    className="text-blue pl-2 hover:underline"
                  >
                    Didn't receive an email?
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
