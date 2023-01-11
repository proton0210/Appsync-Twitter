import { faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { updateImageUrl } from '../server-utils/UpdateImageUrl';
import moment from 'moment';
import { QueryClient } from 'react-query';
import { updateMyProfile } from '../server-utils/UpdateMyProfile';

import React from 'react';

function EditProfileOverlay({
  setEditProfileModal
}: {
  setEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const profile = useSelector((state: any) => state.profile);

  const [newImage, setNewImage] = React.useState<string>(
    profile.imageUrl || ''
  );
  const [backgroundImage, setBackgroundImage] = React.useState<string>(
    profile.backgroundImageUrl || ''
  );
  const [name, setName] = React.useState<string>(profile.name || '');
  const [bio, setBio] = React.useState<string>(profile.bio || '');
  const [website, setWebsite] = React.useState<string>(profile.website || '');
  const [location, setLocation] = React.useState<string>(
    profile.location || ''
  );
  const [birthday, setBirthday] = React.useState<string>(
    profile.birthdate || ''
  );
  const backgroundFileImageInputRef = React.useRef<HTMLInputElement | null>(
    null
  );
  const userImageInputRef = React.useRef<HTMLInputElement | null>(null);
  const queryClient = new QueryClient();

  const saveProfile = async () => {
    console.log('save profile');

    const p = {
      name: name === '' ? null : name,
      imageUrl: newImage || null,
      backgroundImageUrl: backgroundImage || null,
      bio: bio || null,
      location: location || null,
      website: website || null,
      birthdate: birthday || null
    };
    const newProfile = await updateMyProfile(p);
    console.log(newProfile);
    queryClient.refetchQueries('fetchProfile');
    // set a time out for 2 seconds
    setTimeout(() => {
      console.log('timeout fired');
    }, 2000);
    setEditProfileModal(false);
  };

  // const  fileChange = async (ref:any , prop:any)  =>{
  //   const file = ref.current.files[0];
  //   const extension = file.name.split('.').pop();
  //   const contentType = extension === 'png' ? 'image/png' : 'image/jpeg';
  //   const url = await updateImageUrl(extension, contentType);
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   await Axios.put(url, file, {
  //     headers: { ['Content-Type']: contentType }
  //   });
  //   const newImageUrl = url.split('?').shift();

  //   setNewImage(newImageUrl);
  // }
  const openBackgroundImageFileInput = () => {
    if (backgroundFileImageInputRef.current) {
      backgroundFileImageInputRef.current.click();
    }
  };
  const openUserImageFileInput = () => {
    if (userImageInputRef.current) {
      userImageInputRef.current.click();
    }
  };

  const backGroundFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    if (backgroundFileImageInputRef.current?.files?.length) {
      const file = backgroundFileImageInputRef.current.files[0];
      const extension = file.name.split('.').pop();
      const contentType = extension === 'png' ? 'image/png' : 'image/jpeg';
      const url = await updateImageUrl(extension, contentType);
      const formData = new FormData();
      formData.append('image', file);
      await Axios.put(url, file, {
        headers: { ['Content-Type']: contentType }
      });
      const newImageUrl = url.split('?').shift();

      setBackgroundImage(newImageUrl);
      console.log('background image', newImageUrl);
    }
  };
  const userImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    if (userImageInputRef.current?.files?.length) {
      const file = userImageInputRef.current.files[0];
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

  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div
        className="modal-main bg-white mx-auto rounded-lg z-50 overflow-y-auto"
        style={{ height: '65%', width: '40%' }}
      >
        <div className="pl-1 pr-4 py-1 h-16 border-b-2 border-lightblue">
          <button
            onClick={saveProfile}
            className="rounded-full bg-blue font-bold text-white mt-2 p-1 px-4 relative right-0 float-right focus:outline-none hover:bg-darkblue"
          >
            Save
          </button>
          <div className="flex flex-row mt-1 ml-4">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setEditProfileModal(false)}
              className="fas fa-times text-blue text-2xl mb-8 mr-6 rounded-full bg-white p-2 px-3 hover:bg-lightblue"
            />
            <p className="text-xl pt-1 font-bold">Edit profile</p>
          </div>
        </div>

        <div className="border-l-2 border-r-2 border-white">
          {/* <!-- background image --> */}
          <div
            className="relative"
            style={{ height: '200px', display: 'block' }}
          >
            {/* <!-- change background overlay --> */}
            <div className="absolute w-full max-w-full h-full max-h-full bg-gray-600 opacity-50"></div>
            <button
              onClick={openBackgroundImageFileInput}
              className="absolute hover:bg-gray-800 p-3 rounded-full"
              style={{ marginLeft: '45%', marginTop: '80px' }}
            >
              <FontAwesomeIcon
                icon={faCamera}
                className="text-2xl fas fa-camera text-white"
              ></FontAwesomeIcon>
              <input
                onChange={backGroundFileChange}
                ref={backgroundFileImageInputRef}
                accept="image/jpeg"
                type="file"
                className="hidden"
              />
            </button>

            {profile.backgroundImageUrl && (
              <div className="h-full max-h-full">
                <img
                  src={profile.backgroundImageUrl}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            {!profile.backgroundImageUrl && (
              <div className="bg-gray-400 h-full max-h-full"></div>
            )}
          </div>

          <div className="p-3 flex flex-col">
            {/* <!-- profile image --> */}
            <div
              style={{ marginTop: '-80px' }}
              className="relative w-32 h-32 rounded-full mb-6"
            >
              <div className="absolute w-32 h-32 rounded-full bg-gray-600 opacity-50 border-4 border-white"></div>
              <button
                onClick={openUserImageFileInput}
                className="absolute hover:bg-gray-800 p-3 rounded-full ml-10 mt-10"
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-2xl fas fa-camera text-white"
                ></FontAwesomeIcon>
                <input
                  onChange={userImageFileChange}
                  ref={userImageInputRef}
                  accept="image/jpeg"
                  type="file"
                  className="hidden"
                />
              </button>

              <img
                src={newImage}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            </div>

            <div className="w-full bg-lightest border-b-2 border-dark mb-6 py-1 px-3">
              <label className="text-dark">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-lightest text-lg focus:outline-none"
                type="text"
              />
            </div>
            <div className="w-full bg-lightest border-b-2 border-dark mb-6 py-1 px-3">
              <label className="text-dark">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-lightest text-lg focus:outline-none"
                placeholder="Add your bio"
              />
            </div>
            <div className="w-full bg-lightest border-b-2 border-dark mb-6 py-1 px-3">
              <label className="text-dark">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-lightest text-lg focus:outline-none"
                type="text"
                placeholder="Add your location"
              />
            </div>
            <div className="w-full bg-lightest border-b-2 border-dark mb-6 py-1 px-3">
              <label className="text-dark">Website</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-lightest text-lg focus:outline-none"
                type="text"
                placeholder="Add your website"
              />
            </div>
            <div className="w-full bg-lightest border-b-2 border-dark mb-24 py-1 px-3">
              <label className="text-dark">Birth date</label>
              <input
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full bg-lightest text-lg focus:outline-none"
                type="text"
                placeholder="Add your birth date (Eg: 2020-01-31)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileOverlay;
