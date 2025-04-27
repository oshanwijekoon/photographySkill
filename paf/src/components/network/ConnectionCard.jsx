function ConnectionCard({ connection, type, onAccept, onIgnore, onConnect }) {
  return (
    <div className="p-4 flex items-start gap-3">
      <img
        src={connection.profileImage}
        alt={connection.name}
        className="w-12 h-12 rounded-full"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-blue-600 hover:underline cursor-pointer">{connection.name}</h3>
        <p className="text-sm text-gray-600">{connection.title}</p>
        <p className="text-sm text-gray-500">{connection.company}</p>
        
        {connection.mutualConnections > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            {connection.mutualConnections} mutual connection{connection.mutualConnections !== 1 ? 's' : ''}
          </p>
        )}
        
        <div className="mt-2 flex flex-wrap gap-2">
          {type === 'request' ? (
            <>
              <button
                onClick={onAccept}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                Accept
              </button>
              <button
                onClick={onIgnore}
                className="px-3 py-1 text-sm border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition"
              >
                Ignore
              </button>
            </>
          ) : (
            <button
              onClick={onConnect}
              className="px-3 py-1 text-sm border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md transition"
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectionCard;
