import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { useSelector } from 'react-redux';
import { updateImageUrl } from '../server-utils/UpdateImageUrl';
import { updateMyProfile } from '../server-utils/UpdateMyProfile';
import Axios from 'axios';
import { useQueryClient } from 'react-query';
function SetUpProfileOverlay({
  setShowSetUpProfile
}: {
  setShowSetUpProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const [newImage, setNewImage] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const profile = useSelector((state: any) => state.profile);
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      const extension = file.name.split('.').pop();
      const contentType = extension === 'png' ? 'image/png' : 'image/jpeg';
      const url = await updateImageUrl(extension, contentType);
      const formData = new FormData();
      formData.append('image', file);
      await Axios.put(url, file, {
        headers: { ['Content-Type']: contentType }
      });
      const newImageUrl = url.split('?').shift();

      setNewImage(newImageUrl);
      console.log(newImageUrl);
    }
  };
  const finishSetUpProfile = () => {
    const p = {
      name: profile.name,
      imageUrl: newImage
    };
    updateMyProfile(p);
    queryClient.refetchQueries('fetchProfile');
    // set a time out for 2 seconds
    setTimeout(() => {
      console.log('timeout fired');
    }, 2000);

    setShowSetUpProfile(false);
  };
  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-gray-900 opacity-50"
        onClick={() => setShowSetUpProfile(false)}
      ></div>

      <div
        className="modal-main bg-white mx-auto rounded-lg z-50 overflow-y-auto"
        style={{ height: '60%', width: '40%' }}
      >
        <div className="pl-1 pr-4 py-1 h-12">
          {newImage === null ||
            (newImage === 'default_profile.png' && (
              <button
                className="rounded-full bg-white font-bold text-blue mt-2 p-1 px-3 relative right-0 float-right focus:outline-none hover:bg-lightblue"
                onClick={() => setShowSetUpProfile(false)}
              >
                Skip for now
              </button>
            ))}
          {newImage !== null && newImage !== 'default_profile.png' && (
            <button
              onClick={finishSetUpProfile}
              className="rounded-full bg-blue font-bold text-white mt-2 p-1 px-4 relative right-0 float-right focus:outline-none hover:bg-darkblue"
            >
              Next
            </button>
          )}
          <SocialIcon
            network="twitter"
            className="relative fab fa-twitter text-blue text-2xl mt-2 mb-8"
            style={{ marginLeft: '50%' }}
          />
        </div>

        <div className="pt-5 px-8">
          <div className="flex justify-between items-center mb-5">
            <p className="text-2xl font-bold">Pick a profile picture</p>
          </div>
          <p className="text-dark">Have a favorite selfie? Upload it now.</p>

          <div className="mt-16 w-full flex items-center justify-center">
            <div className="fixed">
              <div className="absolute w-32 h-32 rounded-full bg-gray-600 opacity-50"></div>
              <button
                onClick={openFileInput}
                className="fixed hover:bg-gray-800 p-3 rounded-full ml-10 mt-10"
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-2xl fas fa-camera text-white"
                ></FontAwesomeIcon>
                <input
                  onChange={fileChange}
                  ref={fileInputRef}
                  accept="image/jpeg"
                  type="file"
                  className="hidden"
                />
              </button>
              <img className="w-32 h-32 rounded-full" src={newImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetUpProfileOverlay;
