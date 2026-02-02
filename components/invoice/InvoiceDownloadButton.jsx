import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../assets/Colors';
import { CalenderIcon, ClockIcon, DownloadIconIcon, HomeForInvoiceIcon, LocationIcon } from '../../assets/icons/Icons';
import { H6 } from '../typo/typography';

export default function InvoiceDownloadButton({ invoiceData }) {
    const { t } = useTranslation();

    const generateHtml = (data) => `
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'Helvetica', 'Arial', sans-serif; 
                    padding: 20px; 
                    color: #1A3352;
                }
                .header { 
                    text-align: center;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #F0F0F0;
                }
                .home-section {
                    text-align: center;
                    background-color: #F5F5F5;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 25px;
                }
                .section { margin-bottom: 18px; }
                .label { 
                    color: #7C7C7C; 
                    font-size: 13px; 
                    margin-bottom: 4px;
                }
                .value { 
                    font-size: 15px; 
                    color: #1A3352;
                }
                .price-title {
                    font-size: 16px;
                    font-weight: 500;
                    color: #1A3352;
                    margin-bottom: 15px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Payment Summary Invoice</h1>
            </div>

            <div class="home-section">
                <p>${<HomeForInvoiceIcon />} Home</p>
            </div>
            
            <div class="section">
                <div class="label">Cleaning ID</div>
                <div class="value">${data.id}</div>
            </div>

            <div class="section">
                <div class="label">Property Name</div>
                <div class="value">${data.propertyName}</div>
            </div>

            <div class="section">
                <div class="label">${<LocationIcon />} Property Address</div>
                <div class="value">${data.address}</div>
            </div>
            
            <div class="section">
                <div class="label">${<CalenderIcon />} Cleaning Date</div>
                <div class="value">${data.date}</div>
            </div>

            <div class="section">
                <div class="label"> ${<ClockIcon />} Time Slot</div>
                <div class="value">${data.timeSlot}</div>
            </div>

            <div class="section">
                <div class="label">Estimate Duration</div>
                <div class="value">${data.duration}</div>
            </div>

            <div class="section">
                <div class="label">Cleaner</div>
                <div class="value">${data.cleaner}</div>
            </div>
            
            <div class="section">
                <div class="price-title">Price List</div>
            </div>

            <div class="section">
                <div class="label">Property Type</div>
                <div class="value">${data.propertyType}</div>
            </div>

            <div class="section">
                <div class="label">Surface (m²)</div>
                <div class="value">${data.surface}</div>
            </div>

            <div class="section">
                <div class="label">Price</div>
                <div class="value">${data.price}</div>
            </div>
        </body>
        </html>
    `;

    const handleDownload = async () => {
        try {
            const html = generateHtml(invoiceData);
            const { uri } = await Print.printToFileAsync({
                html,
                base64: false
            });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    UTI: '.pdf',
                    mimeType: 'application/pdf'
                });
            } else {
                Alert.alert("Error", "Sharing is not available on your device");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not generate PDF");
        }
    };

    return (
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>

            <DownloadIconIcon />
            <H6 style={styles.downloadText}>{t("invoice.button")}</H6>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    downloadButton: {
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    downloadText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '600'
    }
});