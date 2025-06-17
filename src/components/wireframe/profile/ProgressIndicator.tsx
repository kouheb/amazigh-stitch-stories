
export const ProgressIndicator = () => {
  return (
    <div className="mt-6 text-center">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-medium">1</div>
        <span>Profile Creation</span>
        <div className="w-16 h-0.5 bg-gray-300"></div>
        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-medium">2</div>
        <span>Verification</span>
        <div className="w-16 h-0.5 bg-gray-300"></div>
        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-medium">3</div>
        <span>Welcome</span>
      </div>
    </div>
  );
};
