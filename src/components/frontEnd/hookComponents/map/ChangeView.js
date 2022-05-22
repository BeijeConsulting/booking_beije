import { useMap } from 'react-leaflet/hooks';

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  export default ChangeView;