export default function Event({ data }) {
  return (
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="text-sm">{data.start}</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <span>{data.name}</span>
      </h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
        {data.description}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-medium dark:text-white">{data.author}</span>
        </div>
      </div>
    </article>
  );
}
