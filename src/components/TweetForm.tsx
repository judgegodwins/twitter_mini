import { ChangeEvent, FC, useState } from "react";
import { isEmpty, values } from "lodash";
import { Form, FormikProvider, useFormik } from "formik";
import autosize from "autosize";
import { string, object, array } from "yup";
import { borderClasses } from "helpers/tailwindClasses";
import IconButton, { EllipsisIcon } from "./IconButton";
import { ProfileContainer } from "./TweetCard";
import Gallery from "svg/Gallery.svg";
import ProfileMock from "images/p.jpg";
import ProfileMock2 from "images/p2.jpg";
import ProfileMock3 from "images/p3.jpg";
import AssetsService from "services/AssetService";
import { TweetCreation } from "types/tweet";
import TweetService from "services/TweetService";

const ImageContainer: FC<{ src: string; onRemoveItem: Function }> = ({
  src,
  onRemoveItem,
}) => (
  <div className="relative rounded-2xl mb-3 overflow-hidden">
    <div className="absolute top-1 left-1 z-20">
      <EllipsisIcon onClick={(e) => onRemoveItem()} />
    </div>
    <img
      src={src}
      alt="Profile"
      className="object-cover w-full h-full rounded-2xl -z-10"
    />
  </div>
);

export default function TweetForm() {
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState(false);

  const LoginSchema = object().shape({
    content: string().required(),
    images: array().of(string()).optional(),
  });

  autosize(document.querySelector("textarea")!);

  const formik = useFormik<TweetCreation>({
    initialValues: {
      content: "",
      images: [],
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError(false);
      try {
        const imgRes =
          images.length > 0
            ? await AssetsService.uploadToCloudinary(images)
            : [];
        const res = await TweetService.createTweet({
          ...values,
          images: imgRes.map((r) => r.data.public_id),
        });
        resetForm();
        setSubmitting(false);
      } catch (e) {
        setError(true);
      }
    },
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files!).slice(0, 4);

    setImages((prev) => [...prev, ...files]);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {error && (
          <div className="py-3 px-4">
            <div className="py-3 px-4 bg-red-900/50 text-white text-sm rounded-lg">
              <span>
                Something went wrong, but don't fret — Let's give it another
                shot
              </span>
            </div>
          </div>
        )}
        <div className={`flex px-4 pb-3 pt-1 border-b ${borderClasses}`}>
          <ProfileContainer />
          <div className="flex flex-col grow pt-1">
            <div className="flex flex-col justify-between">
              <div className="flex text-xl cursor-text pb-4">
                <textarea
                  placeholder="What's happening?"
                  className="placeholder:text-slate-400 dark:text-white dark:bg-black resize-none min-h-[1.75rem] h-7 text-xl outline-none grow overflow-hidden"
                  {...getFieldProps("content")}
                />
                {/* <span
                  onInput={() => console.log('inputing')}
                  onChange={() => console.log('changing')}
                  role="textbox"
                  contentEditable
                  className="dark:text-white dark:bg-black outline-none grow empty:before:content-['What\'s_happening?'] empty:before:text-slate-400 break-words overflow-hidden"
                /> */}
              </div>
              {/* {} */}
              <div className="w-full mb-1">
                <div className="flex">
                  <div className="flex grow mr-3 gap-x-2">
                    {/**img flex containers */}
                    {images.map(URL.createObjectURL).map((img, index) => (
                      <ImageContainer
                        key={index}
                        src={img}
                        onRemoveItem={() => {
                          setImages((prev) =>
                            images.filter((i) => images.indexOf(i) !== index)
                          );
                        }}
                      />
                    ))}
                  </div>
                  {/**img flex containers */}
                  {/* <div className="flex grow flex-col">
                <ImageContainer />
                <ImageContainer />
              </div> */}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex mt-3 items-center">
                <label htmlFor="photo_input">
                  <IconButton edge="start" icon={Gallery} color="primary" />
                  <input
                    type="file"
                    name="photos"
                    id="photo_input"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="flex mt-3 items-center">
                <button
                  type="submit"
                  disabled={!isEmpty(errors) || isSubmitting || !values.content}
                  className="w-full rounded-full text-white font-bold leading-5 bg-sky-600 disabled:opacity-50 px-4 py-2"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}
