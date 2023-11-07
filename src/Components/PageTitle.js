const PageTitle = ({ title }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-3 text-center text-2xl font-bold leading-7 tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
  );
};

export default PageTitle;
