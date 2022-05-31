import { faWifi, faUtensils, faFan, faParking, faJugDetergent, faShirt, faDesktop, faWaterLadder, faSmoking, faBell } from '@fortawesome/free-solid-svg-icons'
import { t } from 'i18next';

/* link a service_id with the relative Font Awesome Icon */
const servicesToIcons = [{
    id: 1,
    icon: faParking,
    name: t("fe.components.service.parking")
}, {
    id: 9,
    icon: faWifi,
    name: t("fe.components.service.wifi")
}, {
    id: 10,
    icon: faUtensils,
    name: t("fe.components.service.kitchen")
}, {
    id: 11,
    icon: faFan,
    name: t("fe.components.service.airConditioning")
}, {
    id: 13,
    icon: faJugDetergent,
    name: t("fe.components.service.washingMachine")
}, {
    id: 14,
    icon: faShirt,
    name: t("fe.components.service.iron")
}, {
    id: 15,
    icon: faDesktop,
    name: t("fe.components.service.workingPlace")
}, {
    id: 16,
    icon: faWaterLadder,
    name: t("fe.components.service.swimmingPool")
}, {
    id: 17,
    icon: faSmoking,
    name: t("fe.components.service.allowedSmoking")
}, {
    id: 18,
    icon: faBell,
    name: t("fe.components.service.alarm")
}]

export { servicesToIcons }