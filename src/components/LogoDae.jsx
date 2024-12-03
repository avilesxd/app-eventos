function LogoDae({ className = '' }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img
        src="/logoDae.png"
        alt="Logo Dirección de Asuntos Estudiantiles"
        className="invert"
      />
    </div>
  );
}

export default LogoDae;
