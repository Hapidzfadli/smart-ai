import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
function Card({
  image,
  title,
  role,
  universitas,
  instagram = "",
  github = "",
  linkedin = "",
}) {
  return (
    <div className="max-w-sm transition duration-300 hover:shadow-2xl cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg p-4 h-60 mx-auto" src={image} alt={title} />
      <div className="px-5 py-3 text-center">
        <h5 className="mb-2 text-md font-semibold tracking-tight text-[#19213D] dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {role}
        </p>
        <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
          {universitas}
        </p>
        <div class="flex my-5 justify-center">
          <a
            href={`https://instagram.com/${instagram}`}
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <FaInstagram />
          </a>
          <a
            href={`https://github.com/${github}`}
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <FaGithub />
          </a>
          <a
            href={`https://www.linkedin.com/${linkedin}`}
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
