import { useState } from "react";

interface IconWithTooltipProps {
    text: string;  // Cambiado a texto
    tooltipText: string;
}

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({ text, tooltipText }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative">
            <span
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >{text}
            </span> {/* Cambiado a span */}
            {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                    {tooltipText}
                </div>
            )}
        </div>
    );
};

export default IconWithTooltip;
