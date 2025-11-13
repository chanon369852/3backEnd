import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, FileText, Calendar, Mail, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Terms of Service - RGA Dashboard</title>
        <meta name="description" content="Terms of Service for RGA Dashboard - Real-time Analytics Platform. Read our terms and conditions for using our services." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rga-dashboard.vercel.app/terms" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rga-dashboard.vercel.app/terms" />
        <meta property="og:title" content="Terms of Service - RGA Dashboard" />
        <meta property="og:description" content="Terms of Service for RGA Dashboard - Real-time Analytics Platform" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rga-dashboard.vercel.app/terms" />
        <meta property="twitter:title" content="Terms of Service - RGA Dashboard" />
        <meta property="twitter:description" content="Terms of Service for RGA Dashboard - Real-time Analytics Platform" />
        
        {/* Verification Meta Tags - Add your verification code here when provided */}
        {/* <meta name="verification" content="your-verification-code-here" /> */}
        {/* <meta name="google-site-verification" content="your-google-verification-code" /> */}
        {/* <meta name="facebook-domain-verification" content="your-facebook-verification-code" /> */}
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับ
          </Button>
          
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-gray-900">ข้อกำหนดและเงื่อนไข</CardTitle>
              <p className="text-gray-600 mt-2">Terms of Service - RGA Dashboard</p>
              <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>อัปเดตล่าสุด: 13 พฤศจิกายน 2025</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Content */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-blue-600" />
                1. การยอมรับข้อกำหนด
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  การเข้าใช้งานและใช้บริการ RGA Dashboard ("บริการ") ที่ดำเนินการโดย RGA Analytics Company Limited ("เรา", "บริษัท") 
                  ถือว่าท่านยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขเหล่านี้ทั้งหมด หากท่านไม่ยอมรับข้อกำหนดเหล่านี้ 
                  กรุณาหยุดการใช้งานบริการทันที
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. คำนิยาม</h2>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>"บริการ"</strong> หมายถึง แพลตฟอร์ม RGA Dashboard และบริการที่เกี่ยวข้องทั้งหมด</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>"ผู้ใช้"</strong> หมายถึง บุคคลหรือนิติบุคคลที่ใช้งานบริการของเรา</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>"ข้อมูล"</strong> หมายถึง ข้อมูลทุกประเภทที่ผู้ใช้อัปโหลด จัดเก็บ หรือประมวลผลผ่านบริการ</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. การใช้งานบริการ</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">3.1 สิทธิ์การใช้งาน</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>เราให้สิทธิ์แก่ท่านในการใช้งานบริการตามแผนที่ท่านเลือก</li>
                  <li>สิทธิ์การใช้งานเป็นแบบไม่เฉพาะเจาะจงและไม่สามารถโอนได้</li>
                  <li>ท่านต้องใช้งานบริการตามกฎหมายและข้อกำหนดนี้เท่านั้น</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">3.2 ข้อจำกัดการใช้งาน</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>ห้ามใช้บริการเพื่อกิจกรรมที่ผิดกฎหมายหรือไม่เหมาะสม</li>
                  <li>ห้ามพยายามเข้าถึงระบบโดยไม่ได้รับอนุญาต</li>
                  <li>ห้ามรบกวนหรือขัดขวางการทำงานของบริการ</li>
                  <li>ห้ามคัดลอก ดัดแปลง หรือจำหน่ายบริการโดยไม่ได้รับอนุญาต</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. บัญชีผู้ใช้</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  ท่านมีหน้าที่รับผิดชอบในการรักษาความปลอดภัยของบัญชีและรหัสผ่าน และรับผิดชอบต่อกิจกรรมทั้งหมด
                  ที่เกิดขึ้นภายใต้บัญชีของท่าน
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>ข้อมูลที่ให้แก่เราต้องถูกต้องและเป็นปัจจุบัน</li>
                  <li>แจ้งเราทันทีหากพบการใช้งานบัญชีโดยไม่ได้รับอนุญาต</li>
                  <li>เราสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีที่ละเมิดข้อกำหนด</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. ความเป็นส่วนตัวและข้อมูล</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  เราให้ความสำคัญกับความเป็นส่วนตัวของท่าน การเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล
                  เป็นไปตาม <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">นโยบายความเป็นส่วนตัว</a> ของเรา
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <p className="text-blue-800">
                    <strong>หมายเหตุ:</strong> ข้อมูลที่ท่านอัปโหลดยังคงเป็นของท่าน เราจะไม่เข้าถึงหรือใช้ข้อมูลดังกล่าว
                    เว้นแต่จำเป็นสำหรับการให้บริการหรือตามที่กฎหมายกำหนด
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. การชำระเงินและการยกเลิก</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">6.1 ค่าบริการ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>ค่าบริการเป็นไปตามแผนที่ท่านเลือก</li>
                  <li>การชำระเงินต้องทำล่วงหน้าตามรอบบิล</li>
                  <li>เราสงวนสิทธิ์ในการเปลี่ยนแปลงราคาโดยแจ้งให้ทราบล่วงหน้า 30 วัน</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mt-6">6.2 การยกเลิกบริการ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>ท่านสามารถยกเลิกบริการได้ตลอดเวลา</li>
                  <li>การยกเลิกจะมีผลในรอบบิลถัดไป</li>
                  <li>เราอาจยกเลิกบริการหากมีการละเมิดข้อกำหนด</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. การจำกัดความรับผิดชอบ</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-800">
                    <strong>ข้อจำกัดสำคัญ:</strong> บริการให้บริการในสภาพ "ตามที่เป็น" เราไม่รับประกันว่าบริการจะไม่มีข้อผิดพลาด
                    หรือจะทำงานได้อย่างต่อเนื่อง
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>เราไม่รับผิดชอบต่อความเสียหายทางอ้อมหรือความเสียหายพิเศษ</li>
                  <li>ความรับผิดชอบรวมของเราจำกัดอยู่ที่ค่าบริการที่ท่านชำระในรอบ 12 เดือนที่ผ่านมา</li>
                  <li>เราแนะนำให้ท่านสำรองข้อมูลสำคัญเป็นประจำ</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. การเปลี่ยนแปลงข้อกำหนด</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  เราสงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดเหล่านี้ การเปลี่ยนแปลงที่สำคัญจะแจ้งให้ท่านทราบล่วงหน้า
                  อย่างน้อย 30 วัน การใช้งานบริการต่อไปหลังจากการเปลี่ยนแปลงถือว่าท่านยอมรับข้อกำหนดใหม่
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. กฎหมายที่ใช้บังคับ</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  ข้อกำหนดนี้อยู่ภายใต้กฎหมายไทย ข้อพิพาทใดๆ จะอยู่ในเขตอำนาจศาลไทย
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-blue-600" />
                การติดต่อ
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  หากท่านมีคำถามเกี่ยวกับข้อกำหนดและเงื่อนไขนี้ กรุณาติดต่อเราได้ที่:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>บริษัท:</strong> RGA Analytics Company Limited</p>
                  <p><strong>อีเมล:</strong> legal@rgadashboard.com</p>
                  <p><strong>เว็บไซต์:</strong> https://rgadashboard.com</p>
                  <p><strong>ที่อยู่:</strong> 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</p>
                </div>
              </div>
            </section>

          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            กลับสู่หน้าหลัก
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};
