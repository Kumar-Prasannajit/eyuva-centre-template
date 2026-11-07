const DNAStage = () => {
  const rungs = Array.from({ length: 18 });

  return (
    <div className="relative w-[380px] h-[500px]" aria-hidden="true">
      {/* Blue Glow */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "380px",
          height: "380px",
          left: "-40px",
          top: "20px",
          background:
            "radial-gradient(circle, rgba(29,78,216,.6), transparent 60%)",
        }}
      />

      {/* Orange Glow */}
      <div
        className="absolute rounded-full blur-3xl opacity-40"
        style={{
          width: "320px",
          height: "320px",
          right: "-30px",
          bottom: "0",
          background:
            "radial-gradient(circle, rgba(255,140,0,.7), transparent 60%)",
        }}
      />

      {/* DNA */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="relative"
          style={{
            width: "160px",
            height: "440px",
            transformStyle: "preserve-3d",
            animation: "dnaSpin 12s linear infinite",
          }}
        >
          {rungs.map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, ${
                  -216 + i * 24
                }px) rotateY(${i * 20}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="relative"
                style={{
                  width: "120px",
                  height: "2px",
                  background:
                    "linear-gradient(90deg,#3b82f6,#60a5fa,#f59e0b)",
                }}
              >
                <span
                  className="absolute left-0 top-1/2 w-4 h-4 rounded-full"
                  style={{
                    transform: "translate(-50%,-50%)",
                    background: "#3b82f6",
                    boxShadow: "0 0 15px #3b82f6",
                  }}
                />

                <span
                  className="absolute right-0 top-1/2 w-4 h-4 rounded-full"
                  style={{
                    transform: "translate(50%,-50%)",
                    background: "#f59e0b",
                    boxShadow: "0 0 15px #f59e0b",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DNAStage;