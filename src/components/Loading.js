import ReactLoading from 'react-loading';

function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 2222,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)',
          }}
        >
          <ReactLoading type='balls' color='#b6e5d8' height={60} width={100} />
        </div>
      )}
    </>
  );
}
export default Loading;
