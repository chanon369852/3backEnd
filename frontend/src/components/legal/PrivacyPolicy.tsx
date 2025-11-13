import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
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
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-gray-900">นโยบายความเป็นส่วนตัว</CardTitle>
              <p className="text-gray-600 mt-2">Privacy Policy - RGA Dashboard</p>
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
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-green-600" />
                บทนำ
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  RGA Analytics Company Limited ("เรา", "บริษัท") ให้ความสำคัญกับความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของท่าน 
                  นโยบายความเป็นส่วนตัวนี้อธิบายวิธีการที่เราเก็บรวบรวม ใช้ เปิดเผย และคุ้มครองข้อมูลส่วนบุคคลของท่าน
                  เมื่อท่านใช้บริการ RGA Dashboard
                </p>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
                  <p className="text-green-800">
                    <strong>ความมั่นใจของเรา:</strong> เราปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) 
                    และมาตรฐานสากลในการคุ้มครองข้อมูล
                  </p>
                </div>
              </div>
            </section>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2 text-blue-600" />
                1. ข้อมูลที่เราเก็บรวบรวม
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 ข้อมูลที่ท่านให้โดยตรง</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">ข้อมูลบัญชี</h4>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• ชื่อ-นามสกุล</li>
                        <li>• อีเมล</li>
                        <li>• เบอร์โทรศัพท์</li>
                        <li>• รหัสผ่าน (เข้ารหัส)</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">ข้อมูลองค์กร</h4>
                      <ul className="text-purple-800 text-sm space-y-1">
                        <li>• ชื่อบริษัท/องค์กร</li>
                        <li>• ตำแหน่งงาน</li>
                        <li>• ที่อยู่ธุรกิจ</li>
                        <li>• ข้อมูลการเรียกเก็บเงิน</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 ข้อมูลที่เก็บอัตโนมัติ</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="text-gray-700 space-y-2">
                      <li><strong>ข้อมูลการใช้งาน:</strong> หน้าที่เข้าชม เวลาที่ใช้ คลิกและการโต้ตอบ</li>
                      <li><strong>ข้อมูลอุปกรณ์:</strong> ประเภทอุปกรณ์ ระบบปฏิบัติการ เบราว์เซอร์</li>
                      <li><strong>ข้อมูลเครือข่าย:</strong> IP Address ตำแหน่งทั่วไป (ระดับเมือง)</li>
                      <li><strong>คุกกี้:</strong> เพื่อปรับปรุงประสบการณ์การใช้งาน</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">1.3 ข้อมูลจากบุคคลที่สาม</h3>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-orange-800 mb-2">
                      <strong>การเชื่อมต่อ Social Media:</strong> เมื่อท่านเชื่อมต่อบัญชี Google, Facebook, TikTok
                    </p>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• ข้อมูลโปรไฟล์สาธารณะ</li>
                      <li>• รูปโปรไฟล์</li>
                      <li>• ข้อมูลสถิติ (หากได้รับอนุญาต)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. วัตถุประสงค์การใช้ข้อมูล</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">การให้บริการ</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• สร้างและจัดการบัญชี</li>
                      <li>• ให้บริการตามที่ร้องขอ</li>
                      <li>• ประมวลผลข้อมูลการตลาด</li>
                      <li>• สร้างรายงานและการวิเคราะห์</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">การปรับปรุงบริการ</h3>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• วิเคราะห์การใช้งาน</li>
                      <li>• พัฒนาฟีเจอร์ใหม่</li>
                      <li>• แก้ไขข้อบกพร่อง</li>
                      <li>• เพิ่มประสิทธิภาพ</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">การสื่อสาร</h3>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• ส่งการแจ้งเตือนสำคัญ</li>
                      <li>• อัปเดตบริการ</li>
                      <li>• การสนับสนุนลูกค้า</li>
                      <li>• ข่าวสารผลิตภัณฑ์ (หากยินยอม)</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-900 mb-2">ความปลอดภัย</h3>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• ป้องกันการฉ้อโกง</li>
                      <li>• ตรวจจับการใช้งานผิดปกติ</li>
                      <li>• รักษาความปลอดภัยระบบ</li>
                      <li>• ปฏิบัติตามกฎหมาย</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-2 text-red-600" />
                3. การเปิดเผยข้อมูล
              </h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-800">
                    <strong>หลักการสำคัญ:</strong> เราไม่ขาย เช่า หรือแลกเปลี่ยนข้อมูลส่วนบุคคลของท่านกับบุคคลที่สาม
                    เพื่อวัตถุประสงค์ทางการตลาด
                  </p>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800">เราอาจเปิดเผยข้อมูลในกรณีต่อไปนี้:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">ผู้ให้บริการ</h4>
                    <p className="text-gray-700 text-sm">
                      บริษัทที่ช่วยให้บริการ เช่น cloud hosting, payment processing, email service
                      (ภายใต้ข้อตกลงความลับ)
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">ข้อกำหนดทางกฎหมาย</h4>
                    <p className="text-gray-700 text-sm">
                      เมื่อมีคำสั่งศาล หมายเรียก หรือข้อกำหนดทางกฎหมายที่บังคับให้เปิดเผย
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">การปกป้องสิทธิ์</h4>
                    <p className="text-gray-700 text-sm">
                      เพื่อปกป้องสิทธิ์ ทรัพย์สิน หรือความปลอดภัยของเรา ผู้ใช้ หรือสาธารณชน
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">การควบรวมกิจการ</h4>
                    <p className="text-gray-700 text-sm">
                      ในกรณีที่มีการควบรวม ซื้อขาย หรือโอนกิจการ (จะแจ้งให้ทราบล่วงหน้า)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. การรักษาความปลอดภัยข้อมูล</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">มาตรการรักษาความปลอดภัย</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-green-800 space-y-2">
                      <li>• <strong>การเข้ารหัส:</strong> SSL/TLS สำหรับการส่งข้อมูล</li>
                      <li>• <strong>การเข้ารหัสฐานข้อมูล:</strong> AES-256 encryption</li>
                      <li>• <strong>การควบคุมการเข้าถึง:</strong> Multi-factor authentication</li>
                    </ul>
                    <ul className="text-green-800 space-y-2">
                      <li>• <strong>การสำรองข้อมูล:</strong> สำรองอัตโนมัติทุกวัน</li>
                      <li>• <strong>การตรวจสอบ:</strong> Security audit เป็นประจำ</li>
                      <li>• <strong>การฝึกอบรม:</strong> พนักงานได้รับการฝึกอบรมความปลอดภัย</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <p className="text-blue-800">
                    <strong>การแจ้งเหตุการณ์:</strong> หากเกิดการละเมิดข้อมูล เราจะแจ้งให้ท่านและหน่วยงานที่เกี่ยวข้อง
                    ทราบภายใน 72 ชั่วโมง
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. สิทธิ์ของเจ้าของข้อมูล</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  ท่านมีสิทธิ์ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล ดังนี้:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-indigo-900 mb-2">สิทธิ์พื้นฐาน</h3>
                    <ul className="text-indigo-800 text-sm space-y-1">
                      <li>• <strong>เข้าถึง:</strong> ขอดูข้อมูลที่เราเก็บ</li>
                      <li>• <strong>แก้ไข:</strong> ปรับปรุงข้อมูลที่ไม่ถูกต้อง</li>
                      <li>• <strong>ลบ:</strong> ขอลบข้อมูลส่วนบุคคล</li>
                      <li>• <strong>โอน:</strong> ขอข้อมูลในรูปแบบที่อ่านได้</li>
                    </ul>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-pink-900 mb-2">สิทธิ์เพิ่มเติม</h3>
                    <ul className="text-pink-800 text-sm space-y-1">
                      <li>• <strong>จำกัด:</strong> จำกัดการประมวลผลข้อมูล</li>
                      <li>• <strong>คัดค้าน:</strong> คัดค้านการใช้ข้อมูลบางอย่าง</li>
                      <li>• <strong>ถอนยินยอม:</strong> ยกเลิกความยินยอมที่ให้ไว้</li>
                      <li>• <strong>ร้องเรียน:</strong> ร้องเรียนต่อหน่วยงานกำกับ</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>วิธีการใช้สิทธิ์:</strong> ส่งคำขอมาที่ privacy@rgadashboard.com 
                    เราจะตอบกลับภายใน 30 วัน
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. คุกกี้และเทคโนโลยีติดตาม</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">คุกกี้จำเป็น</h3>
                    <p className="text-yellow-800 text-sm">
                      สำหรับการทำงานพื้นฐานของเว็บไซต์ เช่น การเข้าสู่ระบบ การรักษาความปลอดภัย
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">คุกกี้การวิเคราะห์</h3>
                    <p className="text-blue-800 text-sm">
                      เพื่อเข้าใจการใช้งานและปรับปรุงบริการ (ใช้เมื่อได้รับความยินยอม)
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">คุกกี้การตลาด</h3>
                    <p className="text-purple-800 text-sm">
                      สำหรับแสดงโฆษณาที่เกี่ยวข้อง (ใช้เมื่อได้รับความยินยอม)
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  ท่านสามารถจัดการการตั้งค่าคุกกี้ได้ในเบราว์เซอร์ของท่าน
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. การเก็บรักษาข้อมูล</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">ระยะเวลาการเก็บรักษา</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>ข้อมูลบัญชี:</strong> ตลอดระยะเวลาที่ใช้บริการ + 7 ปี (ตามกฎหมายภาษี)</li>
                    <li>• <strong>ข้อมูลการใช้งาน:</strong> 2 ปี (เพื่อการวิเคราะห์และปรับปรุง)</li>
                    <li>• <strong>ข้อมูลการตลาด:</strong> จนกว่าจะถอนความยินยอม</li>
                    <li>• <strong>ข้อมูลสำรอง:</strong> 30 วัน (เพื่อการกู้คืนในกรณีฉุกเฉิน)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. การโอนข้อมูลข้ามประเทศ</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  บริการของเราใช้ cloud infrastructure ที่อาจจัดเก็บข้อมูลในประเทศต่างๆ 
                  เราจะใช้มาตรการคุ้มครองที่เหมาะสมตามมาตรฐานสากล
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800">
                    <strong>การคุ้มครอง:</strong> Standard Contractual Clauses (SCCs) และการรับรองมาตรฐานความปลอดภัย
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-green-600" />
                การติดต่อเจ้าหน้าที่คุ้มครองข้อมูล
              </h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-green-700 mb-4">
                  หากท่านมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวหรือต้องการใช้สิทธิ์ของท่าน:
                </p>
                <div className="space-y-2 text-green-700">
                  <p><strong>เจ้าหน้าที่คุ้มครองข้อมูล (DPO):</strong> คุณสมชาย ใจดี</p>
                  <p><strong>อีเมล:</strong> privacy@rgadashboard.com</p>
                  <p><strong>โทรศัพท์:</strong> 02-123-4567</p>
                  <p><strong>ไปรษณีย์:</strong> 123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</p>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-green-800 text-sm">
                    <strong>สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล:</strong> 
                    หากไม่พอใจการตอบสนอง ท่านสามารถร้องเรียนได้ที่ www.pdpc.go.th
                  </p>
                </div>
              </div>
            </section>

          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            กลับสู่หน้าหลัก
          </Button>
        </div>
      </div>
    </div>
  );
};
