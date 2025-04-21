import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouteLink} from '../../../core/constants/route-link';

@Component({
	selector: 'app-footer',
	template: `
    <footer class="bg-[#141d22] text-gray-700">
      <!-- Footer Top -->
      <div class="py-12 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <!-- Logo & Description -->
              <div class="mb-4">
                <a href="{{RouteLink.homeRoute}}">
                  <img
                    ngSrc="{{logo2}}"
                    alt="#"
                    class="h-10"
                    width="120"
                    height="10"/>
                </a>
              </div>
              <p class="text-sm text-white mb-4">
                Praesent dapibus, neque id cursus ucibus, tortor neque egestas
                augue, magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
                tincidunt quis, accumsan porttitor, facilisis luctus, metus.
              </p>
              <p class="text-sm font-semibold text-white">
                Got Question? Call us 24/7
                <br/>
                <span class="text-[#FF4500] text-xl"
                ><a href="tel:123456789">+0123 456 789</a></span
                >
              </p>
            </div>

            <div>
              <!-- Information Links -->
              <h4 class="text-lg font-semibold mb-4 text-white">Information</h4>
              <ul class="space-y-2 text-sm text-white">
                <li><a href="#" class="hover:text-blue-500">About Us</a></li>
                <li><a href="#" class="hover:text-blue-500">Faq</a></li>
                <li>
                  <a href="#" class="hover:text-blue-500">Terms & Conditions</a>
                </li>
                <li><a href="#" class="hover:text-blue-500">Contact Us</a></li>
                <li><a href="#" class="hover:text-blue-500">Help</a></li>
              </ul>
            </div>

            <div>
              <!-- Customer Service Links -->
              <h4 class="text-lg font-semibold mb-4 text-white">
                Customer Service
              </h4>
              <ul class="space-y-2 text-sm text-white">
                <li>
                  <a href="#" class="hover:text-blue-500">Payment Methods</a>
                </li>
                <li><a href="#" class="hover:text-blue-500">Money-back</a></li>
                <li><a href="#" class="hover:text-blue-500">Returns</a></li>
                <li><a href="#" class="hover:text-blue-500">Shipping</a></li>
                <li>
                  <a href="#" class="hover:text-blue-500">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div>
              <!-- Contact & Social -->
              <h4 class="text-lg font-semibold mb-4 text-white">
                Get In Touch
              </h4>
              <ul class="text-sm mb-4 space-y-2 text-white">
                <li>NO. 342 - London Oxford Street.</li>
                <li>012 United Kingdom.</li>
                <li>info&#64;eshop.com</li>
                <li>+032 3456 7890</li>
              </ul>
              <div class="flex space-x-3">
                <a href="#" class="text-gray-500 hover:text-blue-500"
                ><i class="ti-facebook"></i
                ></a>
                <a href="#" class="text-gray-500 hover:text-blue-500"
                ><i class="ti-twitter"></i
                ></a>
                <a href="#" class="text-gray-500 hover:text-blue-500"
                ><i class="ti-flickr"></i
                ></a>
                <a href="#" class="text-gray-500 hover:text-blue-500"
                ><i class="ti-instagram"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
	styleUrl: 'footer.component.scss',
	imports: [NgOptimizedImage],
	standalone: true,
})
export class FooterComponent {
  logo2: string='assets/images/shop/logo2.png';
  protected readonly RouteLink = RouteLink;
}
