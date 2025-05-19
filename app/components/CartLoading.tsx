import {IconLoading} from '~/components/Icon';

export function CartLoading() {
  return (
    <div className="flex flex-col space-y-7 justify-center items-center py-12">
      <div className="animate-spin">
        <IconLoading />
      </div>
      <p>Loading cart...</p>
    </div>
  );
}

function IconLoading() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 10.84 21.77 9.73 21.36 8.71L19.95 10.12C20.27 10.71 20.5 11.34 20.5 12C20.5 16.69 16.69 20.5 12 20.5C7.31 20.5 3.5 16.69 3.5 12C3.5 7.31 7.31 3.5 12 3.5C13.29 3.5 14.49 3.83 15.55 4.38L16.96 2.97C15.5 2.35 13.8 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
